import 'antd/dist/antd.dark.min.css';
// import '../styles/vars.css';
// import '../styles/global.css';
import { SessionProvider } from 'next-auth/react';

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
}
