const express = require('express');
const router = express.Router();

const multer = require('multer');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');
        console.log(isValid);
        if (isValid) {
            uploadError = null
        }
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {

        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}_${Date.now()}.${extension}`)
    }
})

const uploadOptions = multer({ storage: storage })

const { handleNewUser } = require('../controller/registerController.js');

router.route('/')
    .post(uploadOptions.single('profilePic'), handleNewUser)

module.exports = router;