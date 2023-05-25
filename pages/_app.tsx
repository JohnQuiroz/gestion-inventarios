import '@/styles/globals.css';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: '/api/graphql',
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>)
}
