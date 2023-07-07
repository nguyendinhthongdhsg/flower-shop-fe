import classNames from 'classnames/bind';
import styles from './ItemLinkToPage.module.scss';
import Link from 'next/link';
import { IconType } from 'react-icons/lib';

interface ItemLinkToPageProps {
    label: string;
    href: string;
    active: string;
    Icon?: IconType;
}

const cx = classNames.bind(styles);

const ItemLinkToPage: React.FC<ItemLinkToPageProps> = ({ label, href, active, Icon }) => {
    return (
        <Link href={href} className={cx('wrapper')} passHref>
            <div className={cx('content', active === href && 'active')}>
                <div className={cx('icon')}>{Icon && <Icon />}</div>
                <h4 className={cx('heading')}>{label}</h4>
                <div className={cx('line')}></div>
            </div>
        </Link>
    );
};

export default ItemLinkToPage;
