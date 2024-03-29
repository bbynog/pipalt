import Layout from '@/components/layouts/admin';
import StoreNoticeCreateOrUpdateForm from '@/components/store-notice/store-notice-form';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { adminAndOwnerOnly } from '@/utils/auth-utils';

export default function CreateStoreNoticePage() {
  const { t } = useTranslation();
  return (
    <>
      <div className='flex border-b border-dashed border-border-base py-5 sm:py-8'>
        <h1 className='text-lg font-semibold text-heading'>
          {t('form:form-title-create-store-notice')}
        </h1>
      </div>
      <StoreNoticeCreateOrUpdateForm />
    </>
  );
}
CreateStoreNoticePage.authenticate = {
  permissions: adminAndOwnerOnly,
};
CreateStoreNoticePage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});
