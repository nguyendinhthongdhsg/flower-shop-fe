import { getDirectory } from '@/api/getDirectory';
import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import { TypeDirectory } from '@/Types';
import ContentDirectory from './ContentDirectory';

const cx = classNames.bind(styles);

const Content = async () => {
    const listDir = await getDirectory();
    return (
        <main className={cx('wrapper')}>
            <div className={cx('content')}>
                {listDir && (
                    <ul className={cx('list')}>
                        {listDir.map((item: TypeDirectory, index: number) => {
                            return (
                                <li key={index} className={cx('item')}>
                                    <ContentDirectory directory={item} />
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </main>
    );
};

export default Content;
