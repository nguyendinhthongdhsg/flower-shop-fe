'use client';

import classnames from 'classnames/bind';
import styles from './NavSearch.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const cx = classnames.bind(styles);

const NavSerach = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <form className={cx('form')}>
                    <button className={cx('button')} type="submit" title="Tìm kiếm">
                        <FontAwesomeIcon className={cx('button-icon')} icon={faMagnifyingGlass} />
                    </button>
                    <input
                        placeholder="Tìm kiếm"
                        type="search"
                        name="search"
                        className={cx('input-search')}
                    />
                </form>
            </div>
        </div>
    );
};

export default NavSerach;
