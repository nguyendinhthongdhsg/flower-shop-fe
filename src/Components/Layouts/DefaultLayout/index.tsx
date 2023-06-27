import classnames from 'classnames/bind';
import Navbar from '@/Components/Navbar';
import styles from './DefaultLayout.module.scss';
import Register from '@/Components/Modals/Register';
import ToasterProvider from '@/providers/ToasterProvider';
interface DefaultLayoutProps {
    children: React.ReactNode;
}

const cx = classnames.bind(styles);

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <Register />
            <ToasterProvider />
            <header className={cx('header')}>
                <Navbar />
            </header>
            <div className={cx('content')}>{children}</div>
        </div>
    );
};

export default DefaultLayout;
