import { AppProps } from "next/app"
import "../styles/global.scss"
import { loadCldr } from '@syncfusion/ej2-base';
import Head from "next/head";
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {

  loadCldr(
    require('cldr-data/supplemental/numberingSystems.json'),
    require('cldr-data/main/pt/ca-gregorian.json'),
    require('cldr-data/main/pt/numbers.json'),
    require('cldr-data/main/pt/timeZoneNames.json')
  );

  return (
    <QueryClientProvider client={queryClient}>

      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

      </Head>

      <Component {...pageProps} />
    </QueryClientProvider >
  )


}

export default MyApp
