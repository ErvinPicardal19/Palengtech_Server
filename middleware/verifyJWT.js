const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer')) return res.sendStatus(401);
    // console.log(authHeader);

    const token = authHeader.split(' ')[1];// [Bearer, token]
    // console.log(token)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            // console.log(err)
            if (err) return res.sendStatus(401); //invalid token
            req.username = decoded.UserInfo.username
            req.roles = decoded.UserInfo.roles
            next();
        }
    )
}

module.exports = verifyJWT;