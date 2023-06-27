'use client';

import classNames from 'classnames/bind';
import styles from './Heading.module.scss';

const cx = classNames.bind(styles);

interface HeadingProps {
    title: string;
    subtitle?: string;
    center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('heading', center && 'center')}>{title}</div>
                <div className={cx('heading-sub', center && 'center')}>{subtitle}</div>
            </div>
        </div>
    );
};

export default Heading;
