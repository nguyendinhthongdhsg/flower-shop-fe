import { getDirectory } from '@/api/getDirectory';
import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import { TypeDirectory, TypeUser } from '@/Types';
import ContentDirectory from './ContentDirectory';
import ContentHeader from './ContentHeader';

const cx = classNames.bind(styles);

interface ContentProps {
    user: TypeUser | undefined;
}

const Content: React.FC<ContentProps> = async ({ user }) => {
    const listDir = await getDirectory();
    return (
        <main className={cx('wrapper')}>
            <div className={cx('content')}>
                <ContentHeader directory={listDir} />
                {listDir && (
                    <ul className={cx('list')}>
                        {listDir.map((item: TypeDirectory, index: number) => {
                            return (
                                <li key={index} className={cx('item')}>
                                    <ContentDirectory directory={item} user={user} />
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
