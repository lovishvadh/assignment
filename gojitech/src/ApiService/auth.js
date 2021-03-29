import { post } from "./BaseApi";

export async function login(accessToken) {
    try {
        return (await post('/login', {
            token: accessToken
        })).data
    }catch(err) {
        console.log(err);
    }
}

export async function storeUsername(channel) {
    try {
        return (await post('/store-username', {
            channel
        }))
    }catch(err) {
        console.log(err);
    }
}