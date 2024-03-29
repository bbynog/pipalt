import QuestionList from '@/components/question/question-list';
import Card from '@/components/common/card';
import Layout from '@/components/layouts/shop';
import { useState } from 'react';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  adminAndOwnerOnly,
  adminOnly,
  getAuthCredentials,
  hasAccess,
} from '@/utils/auth-utils';
import { useRouter } from 'next/router';
import { QuestionPaginator, SortOrder } from '__generated__/__types__';
import { useMyShopsQuery, useShopQuery } from '@/graphql/shops.graphql';
import { useQuestionsQuery } from '@/graphql/questions.graphql';
import { Routes } from '@/config/routes';

export default function Questions() {
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const [_orderBy, setOrder] = useState('created_at');
  const [_sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const router = useRouter();
  const {
    query: { shop },
  } = useRouter();
  const { permissions } = getAuthCredentials();
  const { data: myShop } = useMyShopsQuery();
  const { data: shopData } = useShopQuery({
    variables: { slug: shop as string },
  });
  const shopId = shopData?.shop?.id!;
  const { data, loading, error, refetch } = useQuestionsQuery({
    variables: {
      first: 15,
      shop_id: shopId,
      page,
    },
  });

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handlePagination(current: any) {
    setPage(current);
  }

  if (
    !hasAccess(adminOnly, permissions) &&
    !myShop?.me?.shops?.map((shop: any) => shop.id).includes(shopId) &&
    myShop?.me?.managed_shop?.id != shopId
  ) {
    router.replace(Routes.dashboard);
  }

  return (
    <>
      <Card className='mb-8 flex flex-col'>
        <div className='flex w-full flex-col items-center md:flex-row'>
          <h1 className='text-xl font-semibold text-heading'>
            {t('common:sidebar-nav-item-questions')}
          </h1>
        </div>
      </Card>
      <QuestionList
        questions={data?.all_questions as QuestionPaginator}
        onPagination={handlePagination}
        onOrder={setOrder}
        onSort={setColumn}
        refetch={refetch}
      />
    </>
  );
}

Questions.authenticate = {
  permissions: adminAndOwnerOnly,
};
Questions.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
