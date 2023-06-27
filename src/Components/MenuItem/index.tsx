'use client';

import classnames from 'classnames/bind';
import styles from './MenuItem.module.scss';

const cx = classnames.bind(styles);

interface MenuItemProps {
    label: string;
    onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick }) => {
    return (
        <div onClick={onClick} className={cx('wrapper')}>
            {label}
        </div>
    );
};

export default MenuItem;
