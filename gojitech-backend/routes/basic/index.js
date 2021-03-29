import express from 'express';
import { sendValidationErrorsResponse, sendResponse, sendInternalServerError } from '../../modules/responseBuilder/index.js';
import { loginController, storeUsernameController } from '../../controllers/auth/index.js';
import authentication from '../../authentication.js';

const router = express.Router();

// Define API functions here
async function login(req, res) {
   try {
        const {status, validationErrors, message, body} = await loginController(req.body);
        if(!status) sendValidationErrorsResponse(validationErrors, req, res);
        else sendResponse(200,true,req,res,body, {}, message);
   } catch(err) {
       console.log("Err at signup:", err);
       sendInternalServerError(req, res);
   }
}

async function storeUsername(req, res) {
    try {
         const {status, validationErrors, message, body} = await storeUsernameController(req.username, req.body);
         if(!status) sendValidationErrorsResponse(validationErrors, req, res);
         else sendResponse(200,true,req,res,body, {}, message);
    } catch(err) {
        console.log("Err at signup:", err);
        sendInternalServerError(req, res);
    }
 }
 
router.post('/login', login);
router.post('/store-username', authentication, storeUsername);

export default router;