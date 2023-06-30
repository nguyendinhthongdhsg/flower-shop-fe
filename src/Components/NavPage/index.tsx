'use client';
import classNames from 'classnames/bind';
import styles from './NavPage.module.scss';
import ItemLinkToPage from '../ItemLinkToPage';
import { AiOutlineHome } from 'react-icons/ai';
import { PiFlowerTulipLight } from 'react-icons/pi';
import { usePathname } from 'next/navigation';

const cx = classNames.bind(styles);

const NavPage = () => {
    const pathName = usePathname();

    return (
        <nav className={cx('wrapper')}>
            <div className={cx('content')}>
                <ul className={cx('list-link')}>
                    <li className={cx('item-link')}>
                        <ItemLinkToPage
                            label="Trang chủ"
                            href="/"
                            Icon={AiOutlineHome}
                            active={pathName}
                        />
                    </li>
                    <li className={cx('item-link')}>
                        <ItemLinkToPage
                            label="Hoa sinh nhật"
                            href="/directory/abc"
                            Icon={PiFlowerTulipLight}
                            active={pathName}
                        />
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavPage;
