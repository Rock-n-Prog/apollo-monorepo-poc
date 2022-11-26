import * as React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Button } from '@acme/web-ui/components/inputs';
import { Header1, Header2 } from '@acme/web-ui/components/typography';
import { Flex } from '@acme/web-ui/components/layouts';
import type { WithLocale } from '@acme/web-locales/types/locales';
import createServerSideTranslations from '../utils/createServerSideTranslations';

function IndexPage() {
  const { t } = useTranslation('index');

  return (
    <>
      <Header1>{t('acme', { ns: 'common' })}</Header1>
      <Header2>{t('index')}</Header2>
      <Flex direction="column">
        <Link href="/contents">
          <Button>{t('goToContentsPage')}</Button>
        </Link>
        <Link href="/reviews">
          <Button>{t('goToReviewsPage')}</Button>
        </Link>
      </Flex>
    </>
  );
}

async function getStaticProps({ locale }: WithLocale<unknown>) {
  return {
    props: {
      ...(await createServerSideTranslations({ locale, namespaces: ['common', 'index'] })),
    },
  };
}

export { getStaticProps };
export default IndexPage;
