import Layout from '@/components/layouts/admin';
import CreateOrUpdateProductForm from '@/components/product/product-form';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useProductQuery } from '@/graphql/products.graphql';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { adminOnly } from '@/utils/auth-utils';
import { Config } from '@/config';
import { Product } from '../../../../__generated__/__types__';

export default function UpdateProductPage() {
  const { locale, query } = useRouter();
  const { t } = useTranslation();
  const { data, loading, error } = useProductQuery({
    variables: {
      slug: query.productSlug as string,
      language:
        query.action!.toString() === 'edit' ? locale! : Config.defaultLanguage,
    },
  });
  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <div className='flex border-b border-dashed border-border-base py-5 sm:py-8'>
        <h1 className='text-lg font-semibold text-heading'>
          {t('form:form-title-edit-product')}
        </h1>
      </div>
      <CreateOrUpdateProductForm initialValues={data?.product as Product} />
    </>
  );
}
UpdateProductPage.authenticate = {
  permissions: adminOnly,
};
UpdateProductPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});
