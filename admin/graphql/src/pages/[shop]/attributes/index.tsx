import Card from '@/components/common/card';
import AttributeList from '@/components/attribute/attribute-list';
import ErrorMessage from '@/components/ui/error-message';
import LinkButton from '@/components/ui/link-button';
import Loader from '@/components/ui/loader/loader';
import { useAttributesQuery } from '@/graphql/attributes.graphql';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ShopLayout from '@/components/layouts/shop';
import { useRouter } from 'next/router';
import {
  adminOnly,
  adminOwnerAndStaffOnly,
  getAuthCredentials,
  hasAccess,
} from '@/utils/auth-utils';
import { useMyShopsQuery, useShopQuery } from '@/graphql/shops.graphql';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { MoreIcon } from '@/components/icons/more-icon';
import Button from '@/components/ui/button';
import { Config } from '@/config';
import { Routes } from '@/config/routes';

export default function AttributePage() {
  const router = useRouter();
  const {
    locale,
    query: { shop },
  } = useRouter();
  const { t } = useTranslation();
  const { permissions } = getAuthCredentials();
  const { data: myShop } = useMyShopsQuery();
  const { data: shopData, loading: fetchingShop } = useShopQuery({
    variables: {
      slug: shop as string,
    },
  });
  const shopId = shopData?.shop?.id!;
  const { openModal } = useModalAction();
  const { data, loading, error, refetch } = useAttributesQuery({
    skip: !Boolean(shopId),
    variables: {
      language: locale,
      shop_id: shopId,
    },
    fetchPolicy: 'network-only',
  });

  function handleImportModal() {
    openModal('EXPORT_IMPORT_ATTRIBUTE', shopId);
  }
  if (loading || fetchingShop)
    return <Loader text={t('common:text-loading')} />;
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
      <Card className='mb-8 flex flex-col items-center justify-between md:flex-row'>
        <div className='mb-4 md:mb-0 md:w-1/4'>
          <h1 className='text-xl font-semibold text-heading'>
            {t('common:sidebar-nav-item-attributes')}
          </h1>
        </div>

        <div className='flex w-full flex-col items-center ms-auto md:w-3/4 md:flex-row xl:w-2/4'>
          {locale === Config.defaultLanguage && (
            <LinkButton
              href={`/${shop}/attributes/create`}
              className='mt-5 h-12 w-full md:mt-0 md:w-auto md:ms-auto'
            >
              <span>
                + {t('form:button-label-add')} {t('common:attribute')}
              </span>
            </LinkButton>
          )}

          <Button onClick={handleImportModal} className='mt-5 w-full md:hidden'>
            {t('common:text-export-import')}
          </Button>

          <button
            onClick={handleImportModal}
            className='hidden h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-50 transition duration-300 ms-6 hover:bg-gray-100 md:flex'
          >
            <MoreIcon className='w-3.5 text-body' />
          </button>
        </div>
      </Card>

      <AttributeList attributes={data?.attributes as any} refetch={refetch} />
    </>
  );
}
AttributePage.authenticate = {
  permissions: adminOwnerAndStaffOnly,
};
AttributePage.Layout = ShopLayout;
export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
