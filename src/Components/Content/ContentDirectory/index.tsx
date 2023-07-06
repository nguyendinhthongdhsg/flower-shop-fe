import getFlower from '@/api/getFlower';
import classNames from 'classnames/bind';
import styles from './ContenDirectory.module.scss';
import { TypeDirectory, TypeFlower } from '@/Types';
import Heading from '@/Components/Heading';
import Card from '@/Components/Card';

const cx = classNames.bind(styles);

interface ContenDirectoryProps {
    directory: TypeDirectory;
}

const ContentDirectory: React.FC<ContenDirectoryProps> = async ({ directory }) => {
    const listFlower = await getFlower(directory.id);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                {listFlower && (
                    <>
                        <Heading title={directory.name ? directory.name : ''} />
                        <ul className={cx('list')}>
                            {listFlower[0] &&
                                listFlower.map((item: TypeFlower, index: number) => {
                                    return (
                                        <li key={index}>
                                            <Card flower={item} />
                                        </li>
                                    );
                                })}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
};

export default ContentDirectory;
