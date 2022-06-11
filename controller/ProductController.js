const Products = require('../model/Products.js');

const getAllProduct = async (req, res) => {
    const product = await Products.find();
    if (!product) return res.status(204).json({ 'message': 'No products found.' });
    res.json(product);
}

const addProduct = async (req, res) => {
    console.log(req.body);
    if (!req?.body?.name || !req?.body?.price || !req?.body?.shop || !req?.file) {
        // console.log("NGEK");
        return res.status(400).json({ 'message': 'Please provide credentials' });
    }
    const fileName = req.file.filename
    const basePath = `${req.protocol}://192.168.1.57:5000/public/uploads/`;
    try {
        const result = await Products.create({
            countInStock: req.body.countInStock,
            name: req.body.name,
            img: `${basePath}${fileName}`, //http://localhost:5000/public/uploads/(filename)
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

    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required' });
    }

    let fileName = ''
    let basePath = ''
    if (req?.file) {
        fileName = req.file.filename
        basePath = `${req.protocol}://192.168.1.57:5000/public/uploads/`;
    }

    const product = await Products.findOne({ _id: req.params.id }).exec();

    if (!product) {
        return res.status(204).json({ "message": `No product matches ID ${req.body.id}.` });;
    }

    if (req?.body?.countInStock) product.countInStock = req.body.countInStock;
    if (req?.body?.name) product.name = req.body.name;
    if (req?.file) product.img = `${basePath}${fileName}`;
    if (req?.body?.description) product.description = req.body.description;
    if (req?.body?.price) product.price = req.body.price;
    if (req?.body?.numReviews) product.numReviews = req.body.numReviews;
    if (req?.body?.rating) product.rating = req.body.rating;
    if (req?.body?.isFeatured !== product.isFeatured) product.isFeatured = req.body.isFeatured;
    if (req?.body?.shop) product.shop = req.body.shop;


    const result = await product.save();
    console.log(result);
    res.status(200).json({ success: true, data: result });
}

const deleteProduct = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": "ID parameter is required" });


    const product = await Products.findOne({ _id: req.params.id }).exec()

    if (!product) {
        res.status(404).json({ success: false, msg: "Not Found!" });
        return;
    }

    const result = await Products.deleteOne({ _id: req.params.id })

    res.status(200).json({ success: true, data: result });
}

const getProduct = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": "ID parameter is required" });

    const product = await Products.find({ shop: req.params.id })

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