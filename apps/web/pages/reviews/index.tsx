import * as React from 'react';
import Link from "next/link";
import { useTranslation } from 'next-i18next';
import { Body1, Header1, Header2 } from '@acme/web-ui/components/typography';
import type { WithLocale } from '@acme/web-locales/types/locales';
import { Alert } from '@acme/web-ui/components/feedback';
import {Flex} from "@acme/web-ui/components/layouts";
import {Button} from "@acme/web-ui/components/inputs";
import createServerSideTranslations from '../../utils/createServerSideTranslations';
import { useReviewsQuery } from '../../gql/generated/graphql';

// TODO: Build contents page
function ReviewsPage() {
  const { t } = useTranslation('reviews');
  const { data, loading, error } = useReviewsQuery();

  return (
    <>
      <Header1>{t('acme', { ns: 'common' })}</Header1>
      <Header2>{t('reviews')}</Header2>
      {loading ? (
        <Body1>{t('loading', { ns: 'common' })}</Body1>
      ) : (
        <Flex direction="column">
          {data?.reviews.map(review => (
            <React.Fragment key={review.id}>
              <Body1>{t('review.score', { score: review.score })}</Body1>
              <Body1>{t('review.comments')}</Body1>
              <Link href={`/contents/${review.content?.id}`}>
                <Button variant="text">{review.content?.title}</Button>
              </Link>
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
