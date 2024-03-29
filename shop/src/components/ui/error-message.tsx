import { useTranslation } from 'next-i18next';
interface ErrorProps {
  message?: string;
}

export const Error: React.FC<ErrorProps> = ({ message }) => {
  const { t } = useTranslation('common');
  return (
    <p className='mt-2 text-xs text-red-500 ltr:text-left rtl:text-right'>
      {t(message!)}
    </p>
  );
};

const ErrorMessage: React.FC<ErrorProps> = ({ message }) => {
  const { t } = useTranslation('common');
  return (
    <p className='mx-auto mt-16 min-w-min max-w-sm rounded bg-red-400 p-5 text-center text-lg font-semibold text-light'>
      {t(message!)}
    </p>
  );
};

export default ErrorMessage;
