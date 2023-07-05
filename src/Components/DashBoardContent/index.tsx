'use client';

import classNames from 'classnames/bind';
import { usePathname } from 'next/navigation';
import ItemLinkToPage from '../ItemLinkToPage';
import { VscFileSymlinkDirectory } from 'react-icons/vsc';
import { PiFlowerTulipDuotone } from 'react-icons/pi';
import DashBoardDirectory from './DashBoardDirectory';
import styles from './DashBoardContent.module.scss';
import DashBoardFlower from './DashBoardFlower';

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
                                label="Danh mục hoa"
                                href="/dashboard/directory"
                                Icon={VscFileSymlinkDirectory}
                                active={pathName}
                            />
                        </li>
                        <li className={cx('item-link')}>
                            <ItemLinkToPage
                                label="Sản phẩm"
                                href="/dashboard/flower"
                                Icon={PiFlowerTulipDuotone}
                                active={pathName}
                            />
                        </li>
                    </ul>
                </nav>
                <DashBoardDirectory pathName={pathName} />
                <DashBoardFlower pathName={pathName} />
            </div>
        </main>
    );
};

export default DashBoardContent;
