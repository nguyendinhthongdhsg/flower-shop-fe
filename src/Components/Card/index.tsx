import { TypeFlower, TypeUser } from '@/Types';
import classNames from 'classnames/bind';
import styles from './Card.module.scss';
import { URL_BACKEND } from '@/config';
import format from '@/hooks/useFormat';
import ButtonAddProduct from './ButtonAddProduct';

const cx = classNames.bind(styles);

interface CardProps {
    flower: TypeFlower;
    user: TypeUser | undefined;
}

const Card: React.FC<CardProps> = ({ flower, user }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('card')}>
                    <div className={cx('image-wrapper')}>
                        <div
                            className={cx('image-content')}
                            style={{
                                backgroundImage: `url('${URL_BACKEND}/image?q=${flower.id}')`,
                            }}
                        ></div>
                    </div>
                    <div className={cx('information')}>
                        <div className={cx('info')}>
                            <div className={cx('name')}>
                                <h4>{flower.name}</h4>
                            </div>
                            <div className={cx('directory')}>
                                <h4>{flower.id}</h4>
                            </div>
                        </div>
                        <div className={cx('footer')}>
                            <div className={cx('price')}>
                                <h4>{format(Number(flower.price), 'VNĐ')}</h4>
                            </div>
                            <ButtonAddProduct flower={flower} user={user} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
