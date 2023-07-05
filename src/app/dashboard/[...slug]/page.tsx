import { DefaultLayout } from '@/Components/Layouts';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { loginWithSocal } from '@/api/login';
import { adminAccountAuthentication } from '@/api/adminAccountAuthentication';
import DashBoardContent from '@/Components/DashBoardContent';
import { AiFillWarning } from 'react-icons/ai';

import styles from './page.module.css';
import Heading from '@/Components/Heading';

const Page = async () => {
    let isAdmin = await false;
    const session = await getServerSession(authOptions);
    if (session?.user) {
        await loginWithSocal(session?.user);
        isAdmin = await adminAccountAuthentication(session.user);
    }

    return (
        <div className={styles.wrapper}>
            <DefaultLayout session={session}>
                <div>
                    {isAdmin ? (
                        <DashBoardContent />
                    ) : (
                        <div className={styles.content}>
                            <AiFillWarning className={styles.icon} />
                            <p>Vui lòng liên hệ nhà phát triển để cấp tài khoản Admin!</p>
                        </div>
                    )}
                </div>
            </DefaultLayout>
        </div>
    );
};

export default Page;
