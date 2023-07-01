import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';

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
        <html lang="en">
            <body>{children}</body>
        </html>
    );
};

export default RootLayout;
