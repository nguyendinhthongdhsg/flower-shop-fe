import classNames from 'classnames/bind';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('child')}>{children}</div>
            <Footer />
        </div>
    );
}
