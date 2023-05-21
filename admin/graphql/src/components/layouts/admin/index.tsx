import Navbar from '@/components/layouts/navigation/top-navbar';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { siteSettings } from '@/settings/site.settings';
import { useTranslation } from 'next-i18next';
import MobileNavigation from '@/components/layouts/navigation/mobile-navigation';
import SidebarItem from '../navigation/sidebar-item';

const AdminLayout: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const dir = locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr';

  const SidebarItemMap = () => (
    <Fragment>
      {siteSettings.sidebarLinks.admin.map(({ href, label, icon }, index) => (
        <SidebarItem
          key={label + index}
          href={href}
          label={t(label)}
          icon={icon}
        />
      ))}
    </Fragment>
  );

  return (
    <div
      className='flex min-h-screen flex-col bg-gray-100 transition-colors duration-150'
      dir={dir}
    >
      <Navbar />
      <MobileNavigation>
        <SidebarItemMap />
      </MobileNavigation>

      <div className='flex flex-1 pt-20'>
        <aside className='xl:w-76 fixed bottom-0 hidden h-full w-72 overflow-y-auto bg-white px-4 pt-22 shadow start-0 lg:block'>
          <div className='flex flex-col space-y-6 py-3'>
            <SidebarItemMap />
          </div>
        </aside>
        <main className='xl:ps-76 w-full lg:ps-72'>
          <div className='h-full p-5 md:p-8'>{children}</div>
        </main>
      </div>
    </div>
  );
};
export default AdminLayout;
