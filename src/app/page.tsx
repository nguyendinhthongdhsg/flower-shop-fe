import { DefaultLayout } from '@/Components/Layouts';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { loginWithSocal } from '@/api/login';
import Content from '@/Components/Content';
import styles from './page.module.css';

const Page = async () => {
    const session = await getServerSession(authOptions);
    if (session?.user) {
        await loginWithSocal(session?.user);
    }

    return (
        <div className={styles.wrapper}>
            <DefaultLayout session={session}>
                <div>
                    <Content />
                </div>
            </DefaultLayout>
        </div>
    );
};

export default Page;
