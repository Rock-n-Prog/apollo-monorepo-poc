import * as React from 'react';
import { useTranslation } from 'next-i18next';
import { Header1, Header2 } from '@acme/web-ui/components/typography';
import type { WithLocale } from '@acme/web-locales/types/locales';
import createServerSideTranslations from '../../utils/createServerSideTranslations';

// TODO: Build contents page
function ContentsPage() {
  const { t } = useTranslation('contents');

  return (
    <>
      <Header1>{t('acme', { ns: 'common' })}</Header1>
      <Header2>{t('contents')}</Header2>
    </>
  );
}

async function getStaticProps({ locale }: WithLocale) {
  return {
    props: {
      ...(await createServerSideTranslations({ locale, namespaces: ['common', 'contents'] })),
    },
    revalidate: 1,
  };
}

export { getStaticProps };
export default ContentsPage;
