import classnames from 'classnames/bind';
import Navbar from '@/Components/Navbar';
import styles from './DefaultLayout.module.scss';
import Register from '@/Components/Modals/Register';
import Login from '@/Components/Modals/Login';
import { Session } from 'next-auth';
interface DefaultLayoutProps {
    children: React.ReactNode;
    session: Session | null;
}

const cx = classnames.bind(styles);

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, session }) => {
    return (
        <div className={cx('wrapper')}>
            <Login />
            <Register />
            <header className={cx('header')}>
                <Navbar user={session?.user} />
            </header>
            <div className={cx('content')}>{children}</div>
        </div>
    );
};

export default DefaultLayout;
