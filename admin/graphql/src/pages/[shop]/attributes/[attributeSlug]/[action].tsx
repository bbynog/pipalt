import { useRouter } from 'next/router';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import CreateOrUpdateAttributeForm from '@/components/attribute/attribute-form';
import { useAttributeQuery } from '@/graphql/attributes.graphql';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ShopLayout from '@/components/layouts/shop';
import {
  adminOnly,
  adminOwnerAndStaffOnly,
  getAuthCredentials,
  hasAccess,
} from '@/utils/auth-utils';
import { Config } from '@/config';
import { Attribute } from 'graphql-let/__generated__/__types__';
import { Routes } from '@/config/routes';
import { useMyShopsQuery, useShopQuery } from '@/graphql/shops.graphql';

export default function UpdateAttributePage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { query, locale } = useRouter();
  const { permissions } = getAuthCredentials();
  const { data: myShop } = useMyShopsQuery();
  const { data: shopData } = useShopQuery({
    variables: {
      slug: query.shop as string,
    },
  });
  const shopId = shopData?.shop?.id!;
  const { data, loading, error } = useAttributeQuery({
    variables: {
      slug: query.attributeSlug as string,
      language:
        query.action!.toString() === 'edit' ? locale! : Config.defaultLanguage,
    },
    fetchPolicy: 'network-only',
  });
  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  if (
    !hasAccess(adminOnly, permissions) &&
    !myShop?.me?.shops?.map((shop: any) => shop.id).includes(shopId) &&
    myShop?.me?.managed_shop?.id != shopId
  ) {
    router.replace(Routes.dashboard);
  }
  return (
    <>
      <div className='flex border-b border-dashed border-border-base py-5 sm:py-8'>
        <h1 className='text-lg font-semibold text-heading'>
          {t('form:edit-attribute')}
        </h1>
      </div>
      <CreateOrUpdateAttributeForm
        initialValues={data?.attribute as Attribute}
      />
    </>
  );
}
UpdateAttributePage.authenticate = {
  permissions: adminOwnerAndStaffOnly,
};
UpdateAttributePage.Layout = ShopLayout;
export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
