import { AppProps } from 'next/dist/next-server/lib/router/router';
import '../styles/globals.scss'

const MyApp = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;

  return <Component {...pageProps} />
}


export default MyApp;
