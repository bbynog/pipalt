import Layout from '@/components/layouts/admin';
import SettingsForm from '@/components/settings/settings-form';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useSettingsQuery } from '@/graphql/settings.graphql';
import { adminOnly } from '@/utils/auth-utils';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { SettingsOptions, Shipping, Tax } from '../../__generated__/__types__';
import { useRouter } from 'next/router';

export default function Settings() {
  const { t } = useTranslation();
  const { locale }: any = useRouter();
  const { data, loading, error } = useSettingsQuery({
    fetchPolicy: 'network-only',
    variables: {
      language: locale,
    },
  });
  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className='flex border-b border-dashed border-border-base py-5 sm:py-8'>
        <h1 className='text-lg font-semibold text-heading'>
          {t('form:form-title-settings')}
        </h1>
      </div>
      <SettingsForm
        settings={data?.settings?.options as SettingsOptions}
        taxClasses={data?.taxClasses as Tax[]}
        shippingClasses={data?.shippingClasses as Shipping[]}
      />
    </>
  );
}
Settings.authenticate = {
  permissions: adminOnly,
};
Settings.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});
