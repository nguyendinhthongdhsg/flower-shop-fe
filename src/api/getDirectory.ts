import axios from 'axios';

export async function getDirectory() {
    const res = await axios.get((process.env.URL_BACKEND as string) + '/directory');
    const data = await res.data;
    return data;
}
