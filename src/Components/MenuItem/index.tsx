'use client';

import classnames from 'classnames/bind';
import styles from './MenuItem.module.scss';
import Link from 'next/link';

const cx = classnames.bind(styles);

interface MenuItemProps {
    label: string;
    onClick: () => void;
    redirect?: string | undefined;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick, redirect }) => {
    return (
        <>
            {redirect ? (
                <Link className={cx('link-to-page')} href={redirect} passHref>
                    {label}
                </Link>
            ) : (
                <div onClick={onClick} className={cx('wrapper')}>
                    {label}
                </div>
            )}
        </>
    );
};

export default MenuItem;
