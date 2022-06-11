const User = require('../model/User.js')

const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const refresh = req.body.refreshToken
    // console.log('Refreshing');
    if (!refresh) return res.sendStatus(401);
    // console.log(refresh);

    const refreshToken = refresh;

    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser) return res.sendStatus(403); //Forbidden
    // console.log(foundUser.username);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            // console.log("Decoded Username: ", decoded.username)
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403); //Forbidden

            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            res.json({ accessToken: accessToken });
        }
    );
}

module.exports = { handleRefreshToken };