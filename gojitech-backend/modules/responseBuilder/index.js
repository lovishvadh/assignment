    // General response
  export function sendResponse(statusCode, status, req, res, data, headers, message) {
      return res.status(statusCode).json({
        statusCode,
        status,
        message,
        data
      });
    }
  
    // Data validation errors passed as an array
  export function sendValidationErrorsResponse(validationErrors, req, res) {
      return sendResponse(
        200,
        false,
        req,
        res,
        { errors: validationErrors },
        {},
        "Data validation errors"
      );
    }
  
    // 500 errors or server errors
  export function sendInternalServerError(req, res) {
      return sendResponse(
        500,
        false,
        req,
        res,
        {},
        {},
        "Server encountered an error."
      );
    }
  
    // Unauthorized access to server
  export function sendUnauthorizedResponse(req, res) {
      return sendResponse(401, false, req, res, {}, {}, "Unauthorized");
    }