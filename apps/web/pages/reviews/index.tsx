import * as React from 'react';
import { useTranslation } from 'next-i18next';
import { Body1, Header1, Header2 } from '@acme/web-ui/components/typography';
import type { WithLocale } from '@acme/web-locales/types/locales';
import { Alert } from '@acme/web-ui/components/feedback';
import { Flex } from '@acme/web-ui/components/layouts';
import createServerSideTranslations from '../../utils/createServerSideTranslations';
import { useReviewsQuery } from '../../gql/generated/graphql';
import { ReviewWithComments } from '../../components/reviews/ReviewWithComments';

function ReviewsPage() {
  const { t } = useTranslation('reviews');
  const { data, loading, error, refetch } = useReviewsQuery();

  return (
    <>
      <Header1>{t('acme', { ns: 'common' })}</Header1>
      <Header2>{t('reviews')}</Header2>
      {loading ? (
        <Body1>{t('loading', { ns: 'common' })}</Body1>
      ) : (
        <Flex direction="column">
          {data?.reviews.map(review => (
            <ReviewWithComments key={review.id} review={review} onSubmitComment={refetch} />
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
      ...(await createServerSideTranslations({ locale, namespaces: ['common', 'reviews'] })),
    },
    revalidate: 1,
  };
}

export { getStaticProps };
export default ReviewsPage;
