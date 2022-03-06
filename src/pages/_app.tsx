import 'antd/dist/antd.dark.min.css';
// import '../styles/vars.css';
// import '../styles/global.css';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <>
            <Head>
                <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
                <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
                <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
                <link rel='manifest' href='/site.webmanifest' />
                <meta name='msapplication-TileColor' content='#da532c' />
                <meta name='theme-color' content='#ffffff' />
            </Head>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        </>
    );
}
