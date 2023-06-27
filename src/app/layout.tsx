import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import Head from 'next/head';
import './global.css';

config.autoAddCss = false;

interface RootLayoutProps {
    children: React.ReactNode;
}

export const metadata = {
    title: 'Flower shop',
    description: 'Flower shop create by Next.js 13',
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang="en">
            <Head>
                <meta charSet="utf-8" />
                <link rel="icon" href="/icon.png" sizes="any" />
            </Head>
            <body>{children}</body>
        </html>
    );
};

export default RootLayout;
