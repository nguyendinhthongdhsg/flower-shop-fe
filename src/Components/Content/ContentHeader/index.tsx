import { TypeDirectory } from '@/Types';
import classNames from 'classnames/bind';
import styles from './ContentHeader.module.scss';
import Link from 'next/link';

const cx = classNames.bind(styles);

interface ContentHeaderProps {
    directory: TypeDirectory[];
}

const ContentHeader: React.FC<ContentHeaderProps> = ({ directory }) => {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('content')}>
                <ul className={cx('list')}>
                    {directory &&
                        directory.map((item: TypeDirectory, index: number) => {
                            return (
                                <li key={index} className={cx('item')}>
                                    <a href={`#${item.id}`} className={cx('item-link')}>
                                        {item.name}
                                    </a>
                                </li>
                            );
                        })}
                </ul>
            </div>
        </header>
    );
};

export default ContentHeader;
