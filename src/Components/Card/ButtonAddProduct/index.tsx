'use client';
import classNames from 'classnames/bind';
import styles from './ButtonAddProduct.module.scss';
import { BsCartPlus } from 'react-icons/bs';
import { toast } from 'react-hot-toast';

const cx = classNames.bind(styles);

interface ButtonAddProductProps {
    flowerId: string | null | undefined;
}

const ButtonAddProduct: React.FC<ButtonAddProductProps> = ({ flowerId }) => {
    const addProduct = (id: string | null | undefined) => {
        let listCart = localStorage.getItem('list-cart');
        if (listCart) {
            const listCartArray = JSON.parse(listCart);
            listCartArray.map((item: { id: string; length: number }) => {
                if (item.id === id) {
                    item.length = item.length + 1;
                }
            });
            localStorage.setItem('list-cart', JSON.stringify(listCartArray));
        } else {
            const listCartArray = [{ id, length: 1 }];
            localStorage.setItem('list-cart', JSON.stringify(listCartArray));
        }
        if (id) toast.success(`Thêm sản phẩm ${id} thành công`);
    };

    return (
        <div className={cx('wrapper')}>
            <button className={cx('content')} onClick={() => addProduct(flowerId)}>
                <p>Thêm</p>
                <BsCartPlus className={cx('icon-shopping-svg')} size={20} />
            </button>
        </div>
    );
};

export default ButtonAddProduct;
