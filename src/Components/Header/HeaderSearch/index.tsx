'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './HeaderSearch.module.scss';

const cx = classNames.bind(styles);

export default function HeaderSearch() {
    return (
        <div className={cx('wrapper')}>
            <form className={cx('form')}>
                <button className={cx('btnSubmit')} title={'Tìm kiếm'} type="submit">
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className={cx('btnSubmit-icon')}
                    ></FontAwesomeIcon>
                </button>
                <input type="search" placeholder="Tìm kiếm" className={cx('input')} />
            </form>
        </div>
    );
}
