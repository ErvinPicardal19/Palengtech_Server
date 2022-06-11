const express = require('express');
const router = express.Router();

const {
    getAllShops,
    addShop,
    updateShop,
    deleteShop,
    getShop
} = require('../../controller/ShopController.js');

const {
    getAllProduct,
    addProduct,
    getProduct,
    deleteProduct,
    updateProduct,
} = require('../../controller/ProductController.js');

const {
    addOrder,
    getAllOrder,
    deleteOrder,
    updateOrder,
    getOrder,
    getTotalSales,
} = require('../../controller/orderController.js');

const {
    getAllUser,
    getUser,
    editUser
} = require('../../controller/userController.js');

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


const ROLES_LIST = require('../../config/roles_list.js');
const verifyRoles = require('../../middleware/verifyRoles.js');

router.route('/shop')
    .get(getAllShops)
    .post(uploadOptions.single('image'), addShop)


router.route('/shop/:id')
    .get(getShop)
    .delete(deleteShop)
    .put(uploadOptions.single('image'), updateShop)

router.route('/product')
    .get(getAllProduct)
    .post(uploadOptions.single('img'), addProduct)


router.route('/product/:id')
    .get(getProduct)
    .delete(deleteProduct)
    .put(uploadOptions.single('img'), updateProduct)

router.route('/order')
    .post(addOrder)
    .get(getAllOrder)

router.route('/order/:id')
    .get(getOrder)
    .delete(deleteOrder)
    .put(updateOrder)

router.route('/order/get/totalSales/:id')
    .get(getTotalSales)

router.route('/user')
    .get(getAllUser)

router.route('/user/:id')
    .get(uploadOptions.single('profilePic'), getUser)
    .put(uploadOptions.single('profilePic'), editUser)


module.exports = router;

// verifyRoles([ROLES_LIST.Admin, ROLES_LIST.Editor])
