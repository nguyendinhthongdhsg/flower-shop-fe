'use client';
import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styles from './NavUser.module.scss';
import Avatar from '@/Components/Avatar';
import { useCallback, useEffect, useState } from 'react';
import useRegisterModal from '@/hooks/useRegisterModal';
import MenuItem from '../../MenuItem';
import useLoginModal from '@/hooks/useLoginModal';
import { TypeUser } from '@/Types';
import { signOut } from 'next-auth/react';

const cx = classnames.bind(styles);

interface NavUserProps {
    user: TypeUser | undefined;
}

const NavUser: React.FC<NavUserProps> = ({ user }) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.onclick = (e) => {
                let event: HTMLElement | null;
                event = e.target as HTMLElement;
                while (event && !event.id) {
                    event = event.parentElement;
                }
                if ((event && event.id !== 'nav-user-content-wrapper') || !event) {
                    setIsOpen(false);
                }
            };
        } else {
            document.removeEventListener('onclick', (e) => {
                let event: HTMLElement | null;
                event = e.target as HTMLElement;
                while (event && !event.id) {
                    event = event.parentElement;
                }
                if ((event && event.id !== 'nav-user-content-wrapper') || !event) {
                    setIsOpen(false);
                }
            });
        }
    }, [isOpen]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')} onClick={toggleOpen} id="nav-user-content-wrapper">
                <div className={cx('button-list')}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
                <Avatar image={user?.image} />
                {isOpen && (
                    <div className={cx('menu-list')}>
                        {user ? (
                            <>
                                <MenuItem label="Trang chủ" onClick={() => {}} redirect="/" />
                                <MenuItem label="Tài khoản" onClick={() => {}} />
                                <MenuItem label="Danh sách yêu thích" onClick={() => {}} />
                                <MenuItem
                                    label="Bảng điều khiển"
                                    onClick={() => {}}
                                    redirect="/dashboard/directory"
                                />
                                <div className={cx('item-line')}></div>
                                <MenuItem label="Trợ giúp" onClick={() => {}} />
                                <MenuItem label="Đăng xuất" onClick={() => signOut()} />
                            </>
                        ) : (
                            <>
                                <MenuItem label="Trang chủ" onClick={() => {}} redirect="/" />
                                <MenuItem label="Đăng nhập" onClick={loginModal.onOpen} />
                                <MenuItem label="Đăng ký" onClick={registerModal.onOpen} />
                                <div className={cx('item-line')}></div>
                                <MenuItem label="Trợ giúp" onClick={() => {}} />
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavUser;
