'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './HeaderUser.module.scss';
import HeaderLocation from '../HeaderLocation';

const cx = classNames.bind(styles);

export default function HeaderUser() {
    return (
        <div className={cx('wrapper')}>
            <HeaderLocation />
            <div className={cx('user')}>
                <div className={cx('user-name')}>
                    <p>Nguyễn Đình Thông</p>
                </div>
                <div className={cx('user-img')}>
                    <FontAwesomeIcon icon={faUser} className={cx('user-icon')} />
                </div>
            </div>
        </div>
    );
}
