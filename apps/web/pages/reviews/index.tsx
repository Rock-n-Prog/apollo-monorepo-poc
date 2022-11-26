import * as React from 'react';
import { useTranslation } from 'next-i18next';
import { Header1, Header2 } from '@acme/web-ui/components/typography';
import type { WithLocale } from '@acme/web-locales/types/locales';
import createServerSideTranslations from '../../utils/createServerSideTranslations';

// TODO: Build reviews page
function ReviewsPage() {
  const { t } = useTranslation('reviews');

  return (
    <>
      <Header1>{t('acme', { ns: 'common' })}</Header1>
      <Header2>{t('reviews')}</Header2>
    </>
  );
}

async function getStaticProps({ locale }: WithLocale) {
  return {
    props: {
      ...(await createServerSideTranslations({ locale, namespaces: ['common', 'reviews'] })),
    },
    revalidate: 1,
  };
}

export { getStaticProps };
export default ReviewsPage;
