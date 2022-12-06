import * as React from 'react';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { Header1, Header2, Body1 } from '@acme/web-ui/components/typography';
import type { WithLocale } from '@acme/web-locales/types/locales';
import { Flex } from '@acme/web-ui/components/layouts';
import { Alert } from '@acme/web-ui/components/feedback';
import { useContentQuery } from '../../gql/generated/graphql';
import createServerSideTranslations from '../../utils/createServerSideTranslations';

type PathProps = {
  readonly id: string;
};

function ContentPage({ id = '' }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation('contents');
  const { data, loading, error } = useContentQuery({ variables: { id } });

  return (
    <>
      <Header1>{t('acme', { ns: 'common' })}</Header1>
      <Header2>{loading ? '' : data?.content?.title ?? t('notFound', { ns: 'common' })}</Header2>
      {loading ? (
        <Body1>{t('loading', { ns: 'common' })}</Body1>
      ) : (
        <Flex direction="column">
          <Body1>{t('content.year', { year: data?.content?.year })}</Body1>
          <Body1>{t('content.reviews')}</Body1>
          {data?.content?.reviews?.map(review => (
            <React.Fragment key={review.id}>
              <Body1>{t('content.score', { score: review.score })}</Body1>
              <Body1>{t('content.comments')}</Body1>
              {review.comments?.map((comment, i) => (
                <Body1 key={`${review.id}-${i}`}>{comment}</Body1>
              ))}
            </React.Fragment>
          ))}
        </Flex>
      )}
      {error && <Alert severity="error" text={t('weGotError', { ns: 'common', error: JSON.stringify(error) })} />}
    </>
  );
}

function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

// This is an example for fetching data server-side. Remove tRPC things if not needed (like a non-indexed web app page)
async function getStaticProps({ params, locale }: WithLocale<GetStaticPropsContext<PathProps>>) {
  return {
    props: {
      id: params?.id,
      ...(await createServerSideTranslations({ locale, namespaces: ['common', 'contents'] })),
    },
    revalidate: 1,
  };
}

export { getStaticPaths, getStaticProps };
export default ContentPage;
