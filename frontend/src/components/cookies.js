import Cookie from 'js-cookie';

export const setCookie = (key, value) => {
    Cookie.set(key, value, {expires: 1});
}

export const getCookie = (key) => {
    return Cookie.get(key);
}

export const deleteCookie = (key) => {
    Cookie.remove(key);
}