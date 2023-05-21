import cn from 'classnames';
import { useTranslation } from 'next-i18next';
interface PageLoaderProps {
  text?: string;
}
const PageLoader: React.FC<PageLoaderProps> = ({ text = 'text-loading' }) => {
  const { t } = useTranslation('common');
  return (
    <div
      className={cn(
        'flex h-screen w-full flex-col items-center justify-center',
      )}
    >
      <div className='relative flex'>
        <div className='page_loader' />
        <h3 className='absolute top-1/2 -mt-2 w-full text-center text-sm font-semibold italic text-body'>
          {t(text)}
        </h3>
      </div>
    </div>
  );
};

export default PageLoader;
