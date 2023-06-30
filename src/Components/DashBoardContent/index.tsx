'use client';

import classNames from 'classnames/bind';
import { usePathname } from 'next/navigation';
import ItemLinkToPage from '../ItemLinkToPage';
import { VscFileSymlinkDirectory } from 'react-icons/vsc';
import DashBoardDirectory from './DashBoardDirectory';
import styles from './DashBoardContent.module.scss';

const cx = classNames.bind(styles);

const DashBoardContent = () => {
    const pathName = usePathname();

    return (
        <main className={cx('wrapper')}>
            <div className={cx('content')}>
                <nav className={cx('nav')}>
                    <ul className={cx('list-link')}>
                        <li className={cx('item-link')}>
                            <ItemLinkToPage
                                label="Thêm danh mục"
                                href="/dashboard/home"
                                Icon={VscFileSymlinkDirectory}
                                active={pathName}
                            />
                        </li>
                    </ul>
                </nav>
                <DashBoardDirectory pathName={pathName} />
            </div>
        </main>
    );
};

export default DashBoardContent;
