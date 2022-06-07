const User = require('../model/User.js');

const handleLogout = async (req, res) => {
    //On the frontend, the access token should also be deleted!!!

    const cookies = req.cookies

    if (!cookies?.jwt) return res.sendStatus(204); //No content

    const refreshToken = cookies.jwt;

    // Is refreshToken in DB?
    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204); // No content
    }; //Forbidden

    // Delete refreshToken in DB
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' }); //when deployed add option secure: true - only serves on https
    //also option maxAge: 24 * 60 * 60 * 1000

    res.sendStatus(204); //No content
}

module.exports = { handleLogout };