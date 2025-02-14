import jwt from "jsonwebtoken";

// Method for verifying the token pass the token and secretKey
const verifyToken = (token, secretKey) => {
  return jwt.verify(token, secretKey);
};

export const authenticateMiddleware = (req, res, next) => {
  // get the header from the request as i have passed the token in main server.js  ( allowedHeaders: ["Content-Type", "Authorization"] )
  const authHeader = req.headers.authorization;

  //if the user is not authenticated

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "User is not Authenticated ",
    });
  }
  //if the user is authenticated
  const token = authHeader.split(" ")[1];

  //verify the token
  const payload = verifyToken(token, process.env.JWT_SECRET);

  //this will consist all the userdata ( id email username role )
  req.user = payload;

  next();
};
