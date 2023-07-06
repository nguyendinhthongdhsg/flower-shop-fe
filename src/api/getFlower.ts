import axios from 'axios';

export default async function getFlower(id: string | null | undefined) {
    const res = await axios.get((process.env.URL_BACKEND as string) + `/flower/${id}`);
    const data = await res.data;
    return data;
}
