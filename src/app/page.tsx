import classNames from 'classnames/bind';
import styles from './app.module.scss';
import { DefaultLayout } from '@/Components/Layouts';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { loginWithSocal } from '@/api/login';
import NavPage from '@/Components/NavPage';
import Content from '@/Components/Content';

const cx = classNames.bind(styles);

const Page = async () => {
    const session = await getServerSession(authOptions);
    if (session?.user) {
        await loginWithSocal(session?.user);
    }

    return (
        <div className={cx('wrapper')}>
            <DefaultLayout session={session}>
                <div className={cx('content')}>
                    <NavPage />
                    <Content />
                </div>
            </DefaultLayout>
        </div>
    );
};

export default Page;
