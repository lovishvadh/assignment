import axios from "axios";

export async function validateAuthToken(authToken) {
    try {
        return (await axios({
            method: "GET",
            url: "https://id.twitch.tv/oauth2/validate",
            headers: {
                'Authorization': `OAuth ${authToken}`
            }
        })).data;
    } catch(err) {
        return {login: false};
    }
}