import * as React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Body1, Header1, Header2 } from '@acme/web-ui/components/typography';
import type { WithLocale } from '@acme/web-locales/types/locales';
import { Alert } from '@acme/web-ui/components/feedback';
import { Flex } from '@acme/web-ui/components/layouts';
import { Button } from '@acme/web-ui/components/inputs';
import createServerSideTranslations from '../../utils/createServerSideTranslations';
import { useContentsQuery } from '../../gql/generated/graphql';

function ContentsPage() {
  const { t } = useTranslation('contents');
  const { data, loading, error } = useContentsQuery();

  return (
    <>
      <Header1>{t('acme', { ns: 'common' })}</Header1>
      <Header2>{t('contents')}</Header2>
      {loading ? (
        <Body1>{t('loading', { ns: 'common' })}</Body1>
      ) : (
        <Flex direction="column">
          {data?.contents.map(content => (
            <Link key={content.id} href={`/contents/${content.id}`}>
              <Button variant="text">{`${content.title} - ${content.year}`}</Button>
            </Link>
          ))}
        </Flex>
      )}
      {error && <Alert severity="error" text={t('weGotError', { ns: 'common', error: JSON.stringify(error) })} />}
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
