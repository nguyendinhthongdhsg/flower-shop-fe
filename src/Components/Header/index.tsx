import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import HeaderSearch from './HeaderSearch';
import HeaderUser from './HeaderUser';
const cx = classNames.bind(styles);
export default function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('content')}>
                <ul className={cx('list')}>
                    <li className={cx('item')}>
                        <a href="/" className={cx('trademark')}>
                            <div className={cx('logo')}></div>
                            <h1 className={cx('heading')}>Flower Shop</h1>
                        </a>
                    </li>
                    <li className={cx('item')}>
                        <HeaderSearch />
                    </li>
                    <li className={cx('item')}>
                        <HeaderUser />
                    </li>
                </ul>
            </div>
        </header>
    );
}
