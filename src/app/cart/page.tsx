import { DefaultLayout } from '@/Components/Layouts';
import { loginWithSocal } from '@/api/login';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import styles from './page.module.css';
import CartContent from '@/Components/CartContent';

const page = async () => {
    const session = await getServerSession(authOptions);
    if (session?.user) {
        await loginWithSocal(session?.user);
    }

    return (
        <div className={styles.wrapper}>
            <DefaultLayout session={session}>
                <CartContent user={session?.user} />
            </DefaultLayout>
        </div>
    );
};

export default page;
