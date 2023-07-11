'use client';
import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import { TypeDirectory, TypeUser } from '@/Types';
import ContentDirectory from './ContentDirectory';
import ContentHeader from './ContentHeader';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { URL_BACKEND } from '@/config';
import { toast } from 'react-hot-toast';

const cx = classNames.bind(styles);

interface ContentProps {
    user: TypeUser | undefined;
}

const Content: React.FC<ContentProps> = ({ user }) => {
    const [listDir, setListDir] = useState([]);
    useEffect(() => {
        axios
            .get(URL_BACKEND + '/directory')
            .then((res) => res.data)
            .then((res) => setListDir(res))
            .catch(() => toast.error('Hệ thống xảy ra lỗi'));
    }, []);
    return (
        <main className={cx('wrapper')}>
            <div className={cx('content')}>
                {listDir && listDir[0] && (
                    <>
                        <ContentHeader directory={listDir} />
                        <ul className={cx('list')}>
                            {listDir.map((item: TypeDirectory, index: number) => {
                                return (
                                    <li key={index} className={cx('item')}>
                                        <ContentDirectory directory={item} user={user} />
                                    </li>
                                );
                            })}
                        </ul>
                    </>
                )}
            </div>
        </main>
    );
};

export default Content;
