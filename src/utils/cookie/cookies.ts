import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value: string, option?: any) => {
    return cookies.set(name, value, option);
};

export const removeCookie = (name: string, option?: any) => {
    return cookies.remove(name, { ...option });
};

export const getCookie = (name: string) => {
    return cookies.get(name);
};
