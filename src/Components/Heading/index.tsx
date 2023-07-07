'use client';

import classNames from 'classnames/bind';
import styles from './Heading.module.scss';
import { IconType } from 'react-icons';

const cx = classNames.bind(styles);

interface HeadingProps {
    title: string;
    subtitle?: string;
    center?: boolean;
    icon?: JSX.Element;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center, icon }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('heading', center && 'center')}>
                    {icon ? <div className={cx('heading-icon')}>{icon}</div> : ''}
                    {title}
                </div>
                <div className={cx('heading-sub', center && 'center')}>{subtitle}</div>
            </div>
        </div>
    );
};

export default Heading;
