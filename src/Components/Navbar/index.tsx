import Logo from '../Logo';
import classnames from 'classnames/bind';
import styles from './Navbar.module.scss';
import NavSerach from './NavSearch';
import Address from '../Address';
import NavUser from './NavUser';

const cx = classnames.bind(styles);

const Navbar = () => {
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
                            <NavUser />
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
