const User = require('../model/User.js');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { name, username, password, email, profilePic, phone, location } = req.body;
    if (!username || !password || !email || !location || !phone || !req?.file) return res.status(400).json({ 'message': 'Please provide credentials.' });

    const fileName = req.file.filename
    const basePath = `${req.protocol}://192.168.1.57:5000/public/uploads/`;

    //check for duplicate
    const duplicate = await User.findOne({ email: email }).exec();

    if (duplicate) return res.sendStatus(409); //Conflict

    try {

        //encrypt password
        const hashedPwd = await bcrypt.hash(password, 10);
        //store the new user
        const result = await User.create({
            "username": username,
            "password": hashedPwd,
            "email": email,
            "name": name,
            "profilePic": `${basePath}${fileName}`,
            "phone": phone,
            "location": location
        });

        console.log(result)
        res.status(201).json({ 'success': `New user ${username} created!` });

    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };