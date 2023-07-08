import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Cart = () => {
    return (
        <Link href="/cart" className={cx('wrapper')} passHref>
            <button className={cx('content')} title="Giỏ hàng">
                <FontAwesomeIcon icon={faCartShopping} />
            </button>
        </Link>
    );
};

export default Cart;
