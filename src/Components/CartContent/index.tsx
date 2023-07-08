'use client';

import classNames from 'classnames/bind';
import styles from './CartContent.module.scss';
import { TypeCart, TypeUser } from '@/Types';
import Heading from '../Heading';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { URL_BACKEND } from '@/config';
import format from '@/hooks/useFormat';
import { RiDeleteBin5Line } from 'react-icons/ri';
import Button from '../Button';
import { AiFillWarning, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { toast } from 'react-hot-toast';

const cx = classNames.bind(styles);

interface CartContentProps {
    user: TypeUser | undefined;
}

const CartContent: React.FC<CartContentProps> = ({ user }) => {
    const [listCart, setListCart] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sumPrice, setSumPrice] = useState(0);
    const [sumLength, setSumLength] = useState(0);
    useEffect(() => {
        if (user && user.email) {
            axios
                .get(URL_BACKEND + `/cart?q=${user.email}`)
                .then((res) => res.data)
                .then((res) => {
                    setListCart(res);
                    setIsLoading(false);
                })
                .catch(() => console.log('Call api cart failure!'));
        }
    }, [user]);

    useEffect(() => {
        if (listCart) {
            let sum = 0;
            let length = 0;
            listCart.map((item: TypeCart) => {
                if (item.price && item.length) {
                    sum += item.price * item.length;
                    length += item.length;
                }
            });
            setSumPrice(sum);
            setSumLength(length);
        }
    }, [listCart]);

    const deleteItemCart = (event: EventTarget) => {
        let element = event as HTMLElement;
        while (!element.getAttribute('data-index-product')) {
            if (element.parentElement !== null) element = element.parentElement;
        }
        const id = element.getAttribute('data-id-product');
        const index = element.getAttribute('data-index-product');
        if (id && index) {
            axios
                .delete(URL_BACKEND + '/cart', { data: { id } })
                .then((res) => res.data)
                .then((res) => {
                    if (res.success) {
                        const listFake = [...listCart];
                        listFake.splice(Number(index), 1);
                        setListCart(listFake);
                        toast.success(`Xóa sản phẩm '${id}' thành công.`);
                    } else if (res.error) {
                        toast.error(`Xóa sản phẩm '${id}' thất bại.`);
                    }
                })
                .catch(() => toast.error(`Xóa sản phẩm '${id}' thất bại.`));
        }
    };

    const handlerChangeQuantity = (event: EventTarget) => {
        let element = event as HTMLElement;
        while (!element.getAttribute('data-index-product')) {
            if (element.parentElement !== null) element = element.parentElement;
        }
        const id = element.getAttribute('data-id-product');
        const index = element.getAttribute('data-index-product');
        const option = element.getAttribute('data-option');

        if (id && index && option) {
            axios
                .put(URL_BACKEND + '/cart', { id, option })
                .then((res) => res.data)
                .then((res) => {
                    if (res.success) {
                        const listFake = [...listCart] as TypeCart[];
                        if (listFake[Number(index)]) {
                            const numberFake = listFake[Number(index)].length;
                            if (numberFake) {
                                if (option === 'increase')
                                    listFake[Number(index)].length = numberFake + 1;
                                else if (option === 'decrease') {
                                    if (numberFake - 1 === 0) {
                                        const btnDelete = document.querySelector(
                                            `button[data-id-product='${id}'][title='Xóa']`
                                        ) as HTMLButtonElement;
                                        btnDelete.click();
                                    } else {
                                        listFake[Number(index)].length = numberFake - 1;
                                    }
                                }
                                setListCart(listFake as never[]);
                            }
                        }
                    } else if (res.error) {
                        toast.error('Đã có lỗi xảy ra1.');
                    }
                })
                .catch(() => toast.error('Đã có lỗi xảy ra.2'));
        }
    };

    return (
        <main className={cx('wrapper')}>
            <div className={cx('content')}>
                {user && isLoading && (
                    <header className={cx('header')}>
                        <Heading title="Giỏ hàng của bạn" subtitle="Đang tải..." />
                    </header>
                )}
                {user && !isLoading && listCart ? (
                    <>
                        <header className={cx('header')}>
                            <Heading title="Giỏ hàng của bạn" />
                        </header>
                        <ul className={cx('list')}>
                            <Button onClick={() => {}} label="Đặt hàng" />
                            <li className={cx('item')}>
                                <span className={cx('sum-cart')}>
                                    <div className={cx('sumLength')}>
                                        Tổng số sản phẩm: &nbsp;{sumLength}
                                    </div>
                                    <div className={cx('sumPrice')}>
                                        Tổng số tiền giỏ hàng: &nbsp;{format(sumPrice, 'VNĐ')}
                                    </div>
                                </span>
                            </li>
                            {listCart[0] &&
                                listCart.map((item: TypeCart, index: number) => {
                                    return (
                                        <li key={index} className={cx('item')}>
                                            <div className={cx('item-product')}>
                                                <div className={cx('image')}>
                                                    <div
                                                        className={cx('image-content')}
                                                        style={{
                                                            backgroundImage: `url('${URL_BACKEND}/image?q=${item.id}')`,
                                                        }}
                                                    ></div>
                                                </div>
                                                <div className={cx('name')}>
                                                    <h4>{item.name}</h4>
                                                </div>
                                                <div className={cx('price')}>
                                                    <h4>{format(Number(item.price), 'VNĐ')}</h4>
                                                </div>
                                                <div className={cx('id')}>
                                                    <h4>{item.id}</h4>
                                                </div>
                                                <div className={cx('length')}>
                                                    <button
                                                        type="button"
                                                        title="Giảm"
                                                        data-index-product={index}
                                                        data-id-product={item.id}
                                                        data-option="decrease"
                                                        onClick={(e) =>
                                                            handlerChangeQuantity(e.target)
                                                        }
                                                    >
                                                        <AiOutlineMinus />
                                                    </button>
                                                    <h4>{item.length}</h4>
                                                    <button
                                                        type="button"
                                                        title="Tăng"
                                                        data-index-product={index}
                                                        data-id-product={item.id}
                                                        data-option="increase"
                                                        onClick={(e) =>
                                                            handlerChangeQuantity(e.target)
                                                        }
                                                    >
                                                        <AiOutlinePlus />
                                                    </button>
                                                </div>
                                                <div className={cx('sum')}>
                                                    <h4>
                                                        {item.price &&
                                                            item.length &&
                                                            format(
                                                                Number(item.price * item.length),
                                                                'VNĐ'
                                                            )}
                                                    </h4>
                                                </div>
                                                <span className={cx('delete-product')}>
                                                    <button
                                                        type="button"
                                                        title="Xóa"
                                                        data-id-product={item.id}
                                                        data-index-product={index}
                                                        onClick={(e) => {
                                                            deleteItemCart(e.target);
                                                        }}
                                                    >
                                                        <RiDeleteBin5Line />
                                                    </button>
                                                </span>
                                            </div>
                                        </li>
                                    );
                                })}
                        </ul>
                    </>
                ) : (
                    user &&
                    !isLoading && (
                        <>
                            <Heading title="Giỏ hàng của bạn" subtitle="Danh sách trống" />
                        </>
                    )
                )}
                {!user && (
                    <header className={cx('header')}>
                        <div className={cx('message-warning-login')}>
                            <AiFillWarning className={cx('message-warning-login-icon')} />
                            Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.
                        </div>
                    </header>
                )}
            </div>
        </main>
    );
};

export default CartContent;
