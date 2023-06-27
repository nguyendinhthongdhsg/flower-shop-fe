import classnames from 'classnames/bind';
import styles from './Avatar.module.scss';
import Image, { StaticImageData } from 'next/image';

import { avatar } from '@/assets/images';

const avatarSrc = avatar.src;

interface AvatarProps {
    image?: string;
}

const cx = classnames.bind(styles);

const Avatar: React.FC<AvatarProps> = ({ image = avatarSrc }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <Image
                    src={image}
                    width={42}
                    height={42}
                    priority
                    alt="Avatar"
                    className={cx('img')}
                />
            </div>
        </div>
    );
};

export default Avatar;
