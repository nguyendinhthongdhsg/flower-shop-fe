import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import Head from 'next/head';
import './global.scss';

config.autoAddCss = false;

export const metadata = {
    title: 'Flower shop',
    description: 'Flower shop create by Next.js 13',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <Head>
                <link rel="icon" href="/icon.png" sizes="any" />
                <script
                    async
                    src="https://polyfill.io/v3/polyfill.min.js?features=default"
                ></script>
                <script
                    src="https://maps.googleapis.com/maps/api/js?key=INSERT_YOUR_API_KEY&callback=initMap&v=weekly"
                    defer
                ></script>
            </Head>
            <body>{children}</body>
        </html>
    );
}
