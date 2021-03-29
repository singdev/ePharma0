import { HEADER_AUTHORIZATION, URL } from "./apiServices.js";

const KEY_ACCESS_TOKEN = 'access-token';

export async function login(username, password) {
    try {
        const res = await fetch(URL + "/auth/login", {
            method: "post",
            headers: {
                "Content-Type":"application/x-www-form-urlencoded",
                "authorization": HEADER_AUTHORIZATION
            },
            body:  new URLSearchParams({
                'username': username,
                'password': password,
                'grant_type': 'password',
                'client_id': 'null',
                'client_secret': 'null'
              }),
        });
        if (res.status == 200) {
            const data = await res.json();
            return data;
        } else if(res.status == 400){
            return null;
        }
    } catch (err) {
        return null;
    }
}

export async function updateUserAccount(access_token, information) {
    try {
        const res = await fetch(URL + "/auth/user-account", {
            method: "put",
            headers: {
                "content-type": "application/json",
                "authorization": HEADER_AUTHORIZATION + " Bearer " + access_token
            },
            body:  JSON.stringify(information)
        });
        if (res.status == 200) {
            const data = await res.json();
            return data;
        } else if(res.status == 400){
            return null;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

export function persistAccessToken(access_token){
    window.localStorage.setItem(KEY_ACCESS_TOKEN, access_token);
}

export function getAccessToken(){
    return window.localStorage.getItem(KEY_ACCESS_TOKEN);
}

export function hasAccessToken(){
    return window.localStorage.getItem(KEY_ACCESS_TOKEN) !== null;
}

export function removeAccessToken(){
    window.localStorage.removeItem(KEY_ACCESS_TOKEN);
}