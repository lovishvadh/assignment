import { checkUserAndSave, storeUsername } from '../../models/userService/index.js';
import { sign } from '../../modules/jwt/index.js';
import { validateAuthToken } from '../../modules/twitchAPI/index.js';

export async function loginController(body) {
    try {
        let validationErrors = [];
        // validationErrors = await validateSendOtpData(body);``
        if (validationErrors.length) {
            return {
                status: false,
                validationErrors
            }
        } else {
            const { login } = await validateAuthToken(body.token);
            if(login) {
                await checkUserAndSave(login, body.token);
                return {
                    status: true,
                    message: "Login successfull",
                    body: {
                        accessToken: await sign({
                            username: login
                        },"user"),
                        username: login
                    },
                    validationErrors: []
                }
            } else {
                return {
                    status: false,
                    validationErrors: ["Invalid auth token."]
                }
            }
        }
    } catch (err) {
        throw err;
    }
}

export async function storeUsernameController(username, body) {
    try {
        let validationErrors = [];
        // validationErrors = await validateSendOtpData(body);``
        if (validationErrors.length) {
            return {
                status: false,
                validationErrors
            }
        } else {
            return {
                status: true,
                message: "Username stored successfull",
                body: await storeUsername(username, body.channel),
                validationErrors: []
            }
        }
    } catch (err) {
        throw err;
    }
}