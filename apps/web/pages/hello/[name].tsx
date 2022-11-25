import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { Header1, Header2, Body1 } from '@acme/web-ui/components/typography';
import { Alert } from '@acme/web-ui/components/feedback';
import type { WithLocale } from '@acme/web-locales/types/locales';
import createServerSideTranslations from '../../utils/createServerSideTranslations';

type PathProps = {
  readonly name: string;
};

function NamePage({ name }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation('hello');
  // TODO: Implement backend call
  // const { data, isLoading, error } = trpc.hello.single.useQuery({ name });

  // {error && <Alert severity="error" text={t('weGotError', { ns: 'common', error: JSON.stringify(error) })} />}
  /*
  {isLoading ? (
      <Body1>{t('loading', { ns: 'common' })}</Body1>
  ) : (
      <Body1>{t('weGotDataGreeting', { greeting: data?.greeting })}</Body1>
  )}
  */
  // Loading state not necessary since we fetch data server-side, kept as an example
  return (
    <>
      <Header1>{t('acme', { ns: 'common' })}</Header1>
      <Header2>{t('helloName', { name })}</Header2>
      <Body1>{t('pageToTestTrpcDataWithQueryAndStaticData')}</Body1>
      <Body1>{t('loading', { ns: 'common' })}</Body1>
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
  const name = params?.name ?? 'ACME';
  return {
    props: {
      name,
      ...(await createServerSideTranslations({ locale, namespaces: ['common', 'hello'] })),
    },
    revalidate: 1,
  };
}

export { getStaticPaths, getStaticProps };
export default NamePage;
