import { DefaultLayout } from '@/Components/Layouts';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { loginWithSocal } from '@/api/login';
import { adminAccountAuthentication } from '@/api/adminAccountAuthentication';
import DashBoardContent from '@/Components/DashBoardContent';

const Page = async () => {
    let isAdmin = await false;
    const session = await getServerSession(authOptions);
    if (session?.user) {
        await loginWithSocal(session?.user);
        isAdmin = await adminAccountAuthentication(session.user);
    }

    return (
        <div>
            <DefaultLayout session={session}>
                <div>
                    {isAdmin ? (
                        <DashBoardContent />
                    ) : (
                        <div>Vui lòng liên hệ nhà phát triển để cấp tài khoản Admin</div>
                    )}
                </div>
            </DefaultLayout>
        </div>
    );
};

export default Page;
