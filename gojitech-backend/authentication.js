import { verify } from './modules/jwt/index.js';
import { sendUnauthorizedResponse } from "./modules/responseBuilder/index.js";


export default async function (req, res, next) {
    try {
        console.log(req.headers);
        const authHeadParts = req.headers.authorization.split(" ")[1];
        console.log(authHeadParts, "jwt");
        const decoded = await verify(authHeadParts);
        req.username = decoded.username;
        next();
    } catch (err) {
        console.log("Unauthorized access for api: ", err)
        sendUnauthorizedResponse(req,res);
    }
};