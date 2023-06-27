'use client';
import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styles from './NavUser.module.scss';
import Avatar from '@/Components/Avatar';
import { useCallback, useState } from 'react';
import useRegisterModal from '@/hooks/useRegisterModal';
import MenuItem from '../../MenuItem';

const cx = classnames.bind(styles);

const NavUser = () => {
    const registerModal = useRegisterModal();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')} onClick={toggleOpen}>
                <div className={cx('button-list')}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
                <Avatar />
                {isOpen && (
                    <div className={cx('menu-list')}>
                        <MenuItem label="Đăng nhập" onClick={() => {}} />
                        <MenuItem label="Đăng ký" onClick={registerModal.onOpen} />
                        <MenuItem label="Trợ giúp" onClick={() => {}} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavUser;
