import { TypeUser } from '@/Types';
import axios from 'axios';

export async function loginWithSocal(user: TypeUser | undefined) {
    const res = await axios.post((process.env.URL_BACKEND as string) + '/user/loginWithSocal', {
        user,
    });
    const data = await res.data;
}
