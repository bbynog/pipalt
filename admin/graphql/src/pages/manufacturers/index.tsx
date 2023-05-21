import Card from '@/components/common/card';
import Layout from '@/components/layouts/admin';
import Search from '@/components/common/search';
import ManufacturerList from '@/components/manufacturer/manufacturer-list';
import LinkButton from '@/components/ui/link-button';
import { useManufacturersQuery } from '@/graphql/manufacturers.graphql';
import { useState } from 'react';
import { LIMIT } from '@/utils/constants';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { adminOnly } from '@/utils/auth-utils';
import {
  ManufacturerPaginator,
  QueryManufacturersOrderByColumn,
  SortOrder,
} from '__generated__/__types__';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Routes } from '@/config/routes';
import { Config } from '@/config';

export default function Manufacturers() {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const { data, loading, error, refetch } = useManufacturersQuery({
    variables: {
      language: locale,
      first: LIMIT,
      orderBy: [
        {
          column: QueryManufacturersOrderByColumn.CreatedAt,
          order: SortOrder.Desc,
        },
      ],
      page: 1,
    },
    fetchPolicy: 'network-only',
  });
  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    refetch({
      text: `%${searchText}%`,
      page: 1,
    });
  }

  function handlePagination(current: number) {
    refetch({
      text: `%${searchTerm}%`,
      page: current,
    });
  }

  return (
    <>
      <Card className='mb-8 flex flex-col items-center xl:flex-row'>
        <div className='mb-4 md:w-1/3 xl:mb-0'>
          <h1 className='text-xl font-semibold text-heading'>
            {t('common:text-manufacturers-publications')}
          </h1>
        </div>

        <div className='flex w-full flex-col items-center space-y-4 ms-auto md:flex-row md:space-y-0 xl:w-2/3'>
          <Search onSearch={handleSearch} />

          {locale === Config.defaultLanguage && (
            <LinkButton
              href={`${Routes.manufacturer.create}`}
              className='h-12 w-full md:w-auto md:ms-6'
            >
              <span>
                + {t('form:button-label-add-manufacturer-publication')}
              </span>
            </LinkButton>
          )}
        </div>
      </Card>

      <ManufacturerList
        manufacturers={data?.manufacturers as ManufacturerPaginator}
        onPagination={handlePagination}
        refetch={refetch}
      />
    </>
  );
}
Manufacturers.authenticate = {
  permissions: adminOnly,
};
Manufacturers.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['form', 'common', 'table'])),
  },
});
