import jwt from "jsonwebtoken";

const jwtSecret = "54f2df06f5c09916d4eedcaf6nxkme3b8a9f5c0cd303b67484182a3725d2341315722bdfec229e3d843820b41672b9b452cac498732384897b5391e204bf3b9ce5";

// Signing options for JSON web token JWT token expired in 15 DAYS
const signingOptions = {
  expiresIn: "30d"
};

// Create or sign a new JSON token
export function sign(data) {
  return new Promise((resolve, reject) => {
    jwt.sign(data, jwtSecret, signingOptions, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

// Decode JWT token and get params
export function decode(token) {
  return new Promise((resolve, reject) => {
    jwt.decode(
      token,
      {
        json: true
      },
      (err, data) => {
        if (err) reject(err);
        resolve(data);
      }
    );
  });
}

// Verifying a JWT
export function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      jwtSecret,
      {
        maxAge: signingOptions.expiresIn
      },
      (err, data) => {
        if (err) reject(err);
        resolve(data);
      }
    );
  });
}

