'use client';
import classNames from 'classnames/bind';
import styles from './ButtonAddProduct.module.scss';
import { BsCartPlus } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { URL_BACKEND } from '@/config';
import { TypeFlower, TypeUser } from '@/Types';

const cx = classNames.bind(styles);

interface ButtonAddProductProps {
    flower: TypeFlower;
    user: TypeUser | undefined;
}

const ButtonAddProduct: React.FC<ButtonAddProductProps> = ({ flower, user }) => {
    const addProduct = (flower: TypeFlower) => {
        if (user && user.email) {
            axios
                .post(URL_BACKEND + '/cart', { product: { flower, userId: user.email } })
                .then((res) => res.data)
                .then((res) => {
                    if (res?.success) toast.success(`Thêm sản phẩm '${flower.id}' thành công`);
                    else toast.error(`Thêm sản phẩm '${flower.id}' thất bại`);
                })
                .catch(() => toast.error(`Thêm sản phẩm '${flower.id}' thất bại`));
        } else {
            toast.error('Vui lòng đăng nhập để mua sản phẩm!');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <button className={cx('content')} onClick={() => addProduct(flower)}>
                <p>Thêm</p>
                <BsCartPlus className={cx('icon-shopping-svg')} size={20} />
            </button>
        </div>
    );
};

export default ButtonAddProduct;
