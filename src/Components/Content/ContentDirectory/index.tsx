'use client';

import classNames from 'classnames/bind';
import styles from './ContenDirectory.module.scss';
import { TypeDirectory, TypeFlower, TypeUser } from '@/Types';
import Heading from '@/Components/Heading';
import Card from '@/Components/Card';
import { FaListUl } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { URL_BACKEND } from '@/config';

const cx = classNames.bind(styles);

interface ContenDirectoryProps {
    directory: TypeDirectory;
    user: TypeUser | undefined;
}

const ContentDirectory: React.FC<ContenDirectoryProps> = ({ directory, user }) => {
    const [listFlower, setListFlower] = useState([]);

    useEffect(() => {
        axios
            .get(URL_BACKEND + `/flower/${directory.id}`)
            .then((res) => res.data)
            .then((res) => setListFlower(res))
            .catch(() => toast.error('Hệ thống xảy ra lỗi'));
    }, [directory.id]);

    return (
        <div className={cx('wrapper')} id={directory.id ? directory.id : ''}>
            <div className={cx('content')}>
                {listFlower && listFlower[0] && (
                    <>
                        <div className={cx('heading')}>
                            <Heading
                                title={directory.name ? directory.name : ''}
                                icon={<FaListUl />}
                            />
                        </div>
                        <ul className={cx('list')}>
                            {listFlower.map((item: TypeFlower, index: number) => {
                                return (
                                    <li key={index} className={cx('item')}>
                                        <Card flower={item} user={user} />
                                    </li>
                                );
                            })}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
};

export default ContentDirectory;
