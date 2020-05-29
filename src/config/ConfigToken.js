import Cookies from 'universal-cookie';
export const cookies = new Cookies();
export const TOKEN = cookies.get('jwtToken');

export const API_TOKEN = {
    headers: {
        Authorization: `Bearer ${TOKEN}`
    }
};