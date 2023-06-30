import Logo from '../Logo';
import classnames from 'classnames/bind';
import styles from './Navbar.module.scss';
import NavSerach from './NavSearch';
import Address from '../Address';
import NavUser from './NavUser';
import { TypeUser } from '@/Types';

const cx = classnames.bind(styles);

interface NavbarProps {
    user: TypeUser | undefined;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
    return (
        <nav className={cx('wrapper')}>
            <div className={cx('content')}>
                <ul className={cx('list')}>
                    <li className={cx('item')}>
                        <a href="/">
                            <Logo title="Flower Shop" />
                        </a>
                    </li>
                    <li className={cx('item')}>
                        <NavSerach />
                    </li>
                    <li className={cx('item')}>
                        <div className={cx('itemChildren')}>
                            <Address />
                        </div>
                        <div className={cx('itemChildren')}>
                            <NavUser user={user} />
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
