import axios from "axios";

let authURL = `https://id.twitch.tv/oauth2/authorize?client_id=p5tkpvmr51c7grjszz8rcrwf413vah&redirect_uri=https://d31tgoxord196p.cloudfront.net/sign-in&response_type=token&scope=channel:read:subscriptions%20user:read:email`;


const signInWithTwitch = async () => {
    try {
        const res = (await axios.get(authURL)).data;
        console.log(res)
    } catch(err) {
        console.log(err)
    }
}

export const searchForUser = async (searchQuery) => {
    try {
        const res = (await axios(
            {
                method: 'GET',
                url: `https://api.twitch.tv/helix/search/channels?query=${searchQuery}`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('twitchAccessToken')}`,
                    'Client-Id': 'p5tkpvmr51c7grjszz8rcrwf413vah'
                },
            }
            )).data;
            console.log(res);
            return res;
    } catch(err) {
        console.log(err)
    }
}

