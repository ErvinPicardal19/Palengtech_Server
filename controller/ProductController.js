const Products = require('../model/Products.js');

const getAllProduct = async (req, res) => {
    const product = await Products.find();
    if (!product) return res.status(204).json({ 'message': 'No products found.' });
    res.json(product);
}

const addProduct = async (req, res) => {
    console.log(req.body);
    if (!req?.body?.name || !req?.body?.img || !req?.body?.price || !req?.body?.isFeatured) {
        // console.log("NGEK");
        return res.status(400).json({ 'message': 'Please provide credentials' });
    }

    try {
        const result = await Products.create({
            countInStock: req.body.countInStock,
            name: req.body.name,
            img: req.body.img,
            description: req.body.description,
            price: req.body.price,
            numReviews: req.body.numReviews,
            rating: req.body.rating,
            isFeatured: req.body.isFeatured,
            shop: req.body.shop,
        });

        res.status(201).json(result);
    } catch (err) {
        console.log(err);
    }
}

const updateProduct = async (req, res) => {

    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required' });
    }

    const product = await Products.findOne({ _id: req.body.id }).exec();

    if (!product) {
        return res.status(204).json({ "message": `No product matches ID ${req.body.id}.` });;
    }

    if (req?.body?.countInStock) Products.countInStock = req.body.countInStock;
    if (req?.body?.name) Products.name = req.body.name;
    if (req?.body?.img) Products.img = req.body.img;
    if (req?.body?.description) Products.description = req.body.description;
    if (req?.body?.price) Products.price = req.body.price;
    if (req?.body?.numReviews) Products.numReviews = req.body.numReviews;
    if (req?.body?.rating) Products.rating = req.body.rating;
    if (req?.body?.isFeatured) Products.isFeatured = req.body.isFeatured;
    if (req?.body?.shop?.shopID) Products.shop.shopID = req.body.shop.shopID;


    const result = await product.save();

    res.status(200).json({ success: true, data: result });
}

const deleteProduct = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": "ID parameter is required" });


    const product = await Products.findOne({ _id: req.body.id }).exec()

    if (!product) {
        res.status(404).json({ success: false, msg: "Not Found!" });
        return;
    }

    const result = await Products.deleteOne({ _id: req.body.id })

    res.status(200).json({ success: true, data: result });
}

const getProduct = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": "ID parameter is required" });

    const product = await Products.find({ "shop.shopID": req.params.id })

    if (!product) {
        res.status(404).json({ success: false, msg: "Not Found!" });
        return;
    }

    res.json(product);
}

module.exports = {
    getAllProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct
};