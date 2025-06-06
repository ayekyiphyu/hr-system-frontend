

import "@/styles/globals.css";

import '@/lib/theme.config';
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>HR System</title>
                <meta name="description" content="HR System Management" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Component {...pageProps} />
        </>
    );
}
