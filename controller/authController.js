const User = require('../model/User.js');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body

    if (!user || !pwd) return res.status(400).json({ 'message': 'Username or Password are incorrect' });

    const foundUser = await User.findOne({ username: user }).exec();

    if (!foundUser) return res.sendStatus(401);
    console.log(foundUser);

    //Evaluate Password
    const match = await bcrypt.compare(pwd, foundUser.password);

    if (match) {
        const roles = Object.values(foundUser.roles);

        //create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' } //For practical 15 mins?
        );

        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' } //For practical 15 mins?
        );

        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });//when deployed add option secure: true - only serves on https also option maxAge: 24 * 60 * 60 * 1000, then sameSite for fetch()

        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };