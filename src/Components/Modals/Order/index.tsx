'use client';

import classNames from 'classnames/bind';
import styles from './Order.module.scss';
import Modal from '../Modal';
import useOrderModal from '@/hooks/useOrder';
import { useState } from 'react';
import { TypeCart, TypeUser } from '@/Types';
import axios from 'axios';
import { URL_BACKEND } from '@/config';
import { toast } from 'react-hot-toast';
import { AiFillWarning } from 'react-icons/ai';
import format from '@/hooks/useFormat';
import AddressCP from '@/Components/AddressCP';

const cx = classNames.bind(styles);

interface OrderProps {
    listCart: TypeCart[];
    sumPrice: number;
    sumLength: number;
    user: TypeUser;
}

const Order: React.FC<OrderProps> = ({ listCart, sumPrice, sumLength, user }) => {
    const order = useOrderModal();
    const [isLoading, setIsLoading] = useState(false);
    const [address, setAddress] = useState('');

    const yesOrder = () => {
        axios
            .post(URL_BACKEND + '/', { listCart, sumPrice, sumLength, user, address })
            .then((res) => res.data)
            .then((res) => {
                if (res.success) toast.success('Đặt hàng thành công.');
                else toast.error('Đặt hàng thất bại.');
            })
            .catch(() => toast.error('Đặt hàng thất bại.'));
    };

    const setAdd = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
                    fetch(url)
                        .then((res) => res.json())
                        .then((data) => {
                            const add = data.address;
                            const inputAddress = document.querySelector(
                                '#order-input-address'
                            ) as HTMLInputElement;
                            inputAddress.value = `${add.suburb}, ${add.city_district}, ${add.city}, ${add.country}.`;
                        })
                        .catch(() => console.log('ERROR fetching location data from API'));
                },
                () => console.log('ERROR')
            );
        }
    };

    const bodyContent = (
        <main className={cx('body')}>
            <div className={cx('content')}>
                <ul className={cx('list')}>
                    <li className={cx('item')}>
                        <div className={cx('user-name')}>
                            <p>Họ và tên: &nbsp;{user.name}</p>
                        </div>
                    </li>
                    <li className={cx('item')}>
                        <div className={cx('user-name')}>
                            <p>email: &nbsp;{user.email}</p>
                        </div>
                    </li>
                    <li className={cx('item')}>
                        <div className={cx('sum-length')}>
                            <p>Tổng số sản phẩm: &nbsp;{sumLength}</p>
                        </div>
                    </li>
                    <li className={cx('item')}>
                        <div className={cx('sum-price')}>
                            <p>Tổng số tiền đơn hàng: &nbsp;{format(sumPrice, 'VNĐ')}</p>
                        </div>
                    </li>
                    <li className={cx('item')}>
                        <label htmlFor="order-input-address" className={cx('label')}>
                            Địa chỉ:
                        </label>
                        <div className={cx('input')}>
                            <input
                                id="order-input-address"
                                className={cx('input-address')}
                                type="text"
                                name="address"
                                placeholder="Địa chỉ nhận hàng"
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <AddressCP onClick={setAdd} />
                        </div>
                    </li>
                </ul>
            </div>
        </main>
    );

    const footerContent = (
        <footer className={cx('footer')}>
            <AiFillWarning className={cx('footer-icon')} />
            <p className={cx('footer-message')}>
                Lưu ý trước khi xác nhận, bạn chỉ có thể hủy đơn hàng trước khi chủ shop xác nhận
                đơn hàng của bạn
            </p>
        </footer>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={order.isOpen}
            onClose={order.onClose}
            title="Xác nhận đặt hàng"
            actionLabel="Xác nhận"
            secondaryActionLabel="Hủy"
            body={bodyContent}
            footer={footerContent}
            onSubmit={yesOrder}
            secondaryAction={order.onClose}
        />
    );
};

export default Order;
