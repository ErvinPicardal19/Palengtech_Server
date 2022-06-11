const User = require('../model/User.js');

const getAllUser = async (req, res) => {

    const users = await User.find()
    if (!users) return res.status(204).json({ 'message': 'No Users found.' });
    res.json(users)
}

const getUser = async (req, res) => {
    const id = req?.params?.id;
    if (!id) return res.status(400).json({ 'message': 'Please provide credentials.' });

    const user = await User.findOne({ _id: id }).exec();

    if (!user) {
        res.status(404).json({ success: false, msg: "Not Found!" });
        return;
    }

    res.json(user);

}

const editUser = async (req, res) => {

    const id = req?.params?.id;
    if (!id) return res.status(400).json({ 'message': 'Please provide credentials.' });

    const user = await User.findOne({ _id: id }).exec();
    console.log(user);
    if (req?.body?.username) user.username = req.body.username;

    if (req?.body?.password) {
        const hashedPwd = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPwd;
    }

    let fileName = ''
    let basePath = ''
    if (req?.file) {
        fileName = req.file.filename
        basePath = `${req.protocol}://192.168.1.57:5000/public/uploads/`;
    }

    if (req?.body?.roles) user.roles = req.body.roles;
    if (req?.body?.email) user.email = req.body.email;
    if (req?.body?.name) user.name = req.body.name;
    if (req?.file) user.profilePic = `${basePath}${fileName}`;
    if (req?.body?.phone) user.phone = req.body.phone;
    if (req?.body?.location) user.location = req.body.location;

    const result = await user.save();

    res.status(200).json({ success: true, data: result });

}

// const banUser = async (req, res) => {
//     if (!req?.params?.id) return res.status(400).json({ "message": "ID parameter is required" });

//     console.log(req.params.id);
//     const user = await User.findOne({ _id: req.params.id }).exec()

//     if (!user) {
//         res.status(404).json({ success: false, msg: "Not Found!" });
//         return;
//     }

//     const result = await User.deleteOne({ _id: user._id })

//     res.status(200).json({ success: true, data: result });
// }

module.exports = { editUser, getAllUser, getUser };