import useLayout from '@/lib/hooks/use-layout';
import Footer from './footer';
import Header from './header';
import HeaderMinimal from './header-minimal';
// import MobileNavigation from './mobile-navigation';

import dynamic from 'next/dynamic';

const MobileNavigation = dynamic(() => import('./mobile-navigation'), {
  ssr: false,
});

const SiteLayoutWithFooter = ({ children }: { children?: React.ReactNode }) => {
  const { layout } = useLayout();
  return (
    <div className='flex min-h-screen flex-col bg-gray-100 transition-colors duration-150'>
      {layout === 'minimal' ? (
        <HeaderMinimal layout={layout} />
      ) : (
        <Header layout={layout} />
      )}
      {children}
      <MobileNavigation />
      <Footer />
    </div>
  );
};
export const getLayoutWithFooter = (page: React.ReactElement) => (
  <SiteLayoutWithFooter>{page}</SiteLayoutWithFooter>
);
export default SiteLayoutWithFooter;
