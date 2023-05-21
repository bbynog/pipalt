import Card from '@/components/common/card';
import Layout from '@/components/layouts/admin';
import Search from '@/components/common/search';
import ProductList from '@/components/product/product-list';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useProductsQuery } from '@/graphql/products.graphql';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { adminOnly } from '@/utils/auth-utils';
import CategoryTypeFilter from '@/components/product/category-type-filter';
import cn from 'classnames';
import { ArrowDown } from '@/components/icons/arrow-down';
import { ArrowUp } from '@/components/icons/arrow-up';
import { ProductPaginator, SortOrder } from '__generated__/__types__';
import QuantitySortFilter from '@/components/product/quantity-sort-filter';
import { useRouter } from 'next/router';
import { QueryProductsOrderByColumn } from '@/types/custom-types';
import { formatSearchParams } from '@/utils/format-search-params';

export default function ProductsPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [visible, setVisible] = useState(false);
  const { locale } = useRouter();
  const toggleVisible = () => {
    setVisible((v) => !v);
  };

  const { data, loading, error, refetch } = useProductsQuery({
    variables: {
      language: locale,
      first: 10,
      orderBy: QueryProductsOrderByColumn.CREATED_AT,
      sortedBy: SortOrder.Desc,
      page: 1,
    },
    fetchPolicy: 'network-only',
  });

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    refetch({
      search: formatSearchParams({
        name: searchText,
      }),
      page: 1,
    });
  }

  function handlePagination(current: any) {
    refetch({
      search: formatSearchParams({
        name: searchTerm,
      }),
      page: current,
    });
  }

  return (
    <>
      <Card className='mb-8 flex flex-col'>
        <div className='flex w-full flex-col items-center md:flex-row'>
          <div className='mb-4 md:mb-0 md:w-1/4'>
            <h1 className='text-lg font-semibold text-heading'>
              {t('form:input-label-products')}
            </h1>
          </div>

          <div className='flex w-full flex-col items-center ms-auto md:w-3/4'>
            <Search onSearch={handleSearch} />
          </div>

          <button
            className='mt-5 flex items-center whitespace-nowrap text-base font-semibold text-accent md:mt-0 md:ms-5'
            onClick={toggleVisible}
          >
            {t('common:text-filter')}{' '}
            {visible ? (
              <ArrowUp className='ms-2' />
            ) : (
              <ArrowDown className='ms-2' />
            )}
          </button>
        </div>

        <div
          className={cn('flex w-full transition', {
            'visible h-auto': visible,
            'invisible h-0': !visible,
          })}
        >
          <div className='mt-5 flex w-full flex-col space-y-5 border-t border-gray-200 pt-5 rtl:space-x-reverse md:mt-8 md:flex-row md:items-center md:space-x-5 md:space-y-0 md:pt-8'>
            <CategoryTypeFilter refetch={refetch} className='w-full md:w-2/3' />
            <QuantitySortFilter refetch={refetch} className='w-full md:w-1/3' />
          </div>
        </div>
      </Card>
      <ProductList
        products={data?.products as ProductPaginator}
        onPagination={handlePagination}
        refetch={refetch}
      />
    </>
  );
}
ProductsPage.authenticate = {
  permissions: adminOnly,
};
ProductsPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
