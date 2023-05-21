import { useTranslation } from 'next-i18next';

const CashPayment = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <span className='block text-sm text-body'>{t('text-cash-message')}</span>
    </>
  );
};
export default CashPayment;
