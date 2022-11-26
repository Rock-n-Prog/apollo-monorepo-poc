import * as React from 'react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import { ThemeProvider } from '@acme/web-ui/contexts/ThemeProvider';
import { Container } from '@acme/web-ui/components/layouts';
import { SnackbarProvider } from '@acme/web-ui/contexts/SnackbarProvider';
import { LocaleProvider } from '../contexts/LocaleProvider';
import { Toolbar } from '../components/dev-tools/Toolbar';

function App({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: process.env.API_URL,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <LocaleProvider>
        <ThemeProvider>
          <SnackbarProvider>
            <Toolbar />
            <Container>
              <Component {...pageProps} />
            </Container>
          </SnackbarProvider>
        </ThemeProvider>
      </LocaleProvider>
    </ApolloProvider>
  );
}

export default appWithTranslation(App);
