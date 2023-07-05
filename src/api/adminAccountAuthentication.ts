import { TypeUser } from '@/Types';
import axios from 'axios';

export async function adminAccountAuthentication(user: TypeUser | undefined) {
    const res = await axios.post((process.env.URL_BACKEND as string) + '/user/loginWithAdmin', {
        user,
    });
    const isAdmin = await res.data;
    return isAdmin;
}
