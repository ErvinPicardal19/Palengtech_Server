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
    updateProduct
} = require('../../controller/ProductController.js');

const {
    addOrder,
    getAllOrder,
    deleteOrder,
    updateOrder,
    getOrder
} = require('../../controller/OrderController.js');

const ROLES_LIST = require('../../config/roles_list.js');
const verifyRoles = require('../../middleware/verifyRoles.js');

router.route('/shop')
    .get(getAllShops)
    .post(addShop)
    .delete(deleteShop)
    .put(updateShop)


router.route('/shop/:id')
    .get(getShop)

router.route('/product')
    .get(getAllProduct)
    .post(addProduct)
    .delete(deleteProduct)
    .put(updateProduct)


router.route('/product/:id')
    .get(getProduct)

router.route('/order')
    .post(addOrder)
    .delete(deleteOrder)
    .put(updateOrder)
    .get(getOrder)

router.route('/order/:id')
    .get(getAllOrder)

module.exports = router;


// verifyRoles([ROLES_LIST.Admin, ROLES_LIST.Editor])