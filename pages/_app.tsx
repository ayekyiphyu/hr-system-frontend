

import "@/styles/globals.css";

import '@/lib/theme.config';
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>HR System</title>
                <meta property="og:locale:alternate" content="ja_JP" />
                <meta property="og:locale:alternate" content="en_US" />
                <meta property="og:locale:alternate" content="vi_VN" />
                <meta property="og:locale:alternate" content="km-KH" />
                <meta property="og:site_name" content="YUIME株式会社" />
                <meta property="og:image" content="ogp-image.png" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://yuime.co.jp/" />
                <meta property="og:description" content="YUIME（ゆいめ）は、農業の人材派遣・農作業受託を中心に一次産業をサポートする企業です。事業内容サービス概要、採用情報、会社情報、問合せフォームの情報等を掲載しています。" />
                <meta property="og:title" content="YUIME株式会社" />

                <meta name="description" content="HR System Management" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head >

            <Component {...pageProps} />
        </>
    );
}
