import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import {useQuery, gql} from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uir: 'https://api.studio.thegraph.com/query/46535/nessyland-v01-sepolia/v0.0.1'
})

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>NessyLand</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ApolloProvider client={client}>
      <main>
        <h1 className={styles.title}>
          Welcome to NessyLand,
        </h1>

        <p className={styles.description}>
          For Writers.
        </p>

        </main>
        </ApolloProvider>
    </div>
  )
}
