import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import NextTopLoader from 'nextjs-toploader';
import ToasterProvider from '@/providers/ToasterProvider';

config.autoAddCss = false;

interface RootLayoutProps {
    children: React.ReactNode;
}

export const metadata = {
    title: 'Flower shop',
    description: 'Flower shop create by Next.js 13',
    icons: '/icon.png',
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    return (
        <>
            <html lang="en">
                <body>
                    <ToasterProvider />
                    <NextTopLoader
                        color="#000"
                        initialPosition={0.08}
                        crawlSpeed={200}
                        height={3}
                        crawl={true}
                        showSpinner={false}
                        easing="ease"
                        speed={200}
                        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                    />
                    {children}
                </body>
            </html>
        </>
    );
};

export default RootLayout;
