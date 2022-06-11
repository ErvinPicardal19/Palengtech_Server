const Shops = require('../model/Shops.js');

const getAllShops = async (req, res) => {
    const shops = await Shops.find();
    if (!shops) return res.status(204).json({ 'message': 'No shops found.' });
    res.json(shops);
}

const addShop = async (req, res) => {
    console.log(req.body);
    if (!req?.body?.name || !req?.body?.image || !req?.body?.user || !req?.file) {
        // console.log("NGEK");
        return res.status(400).json({ 'message': 'Please provide credentials' });
    }

    const fileName = req.file.filename
    const basePath = `${req.protocol}://192.168.1.57:5000/public/uploads/`;

    try {

        const result = await Shops.create({
            image: `${basePath}${fileName}`,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
            name: req.body.name,
            description: req.body.description,
            address: req.body.address,
            category: req.body.category,
            user: req.body.user,
        });

        res.status(201).json(result);
    } catch (err) {
        console.log(err);
    }
}

const updateShop = async (req, res) => {

    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required' });
    }

    const shop = await Shops.findOne({ _id: req.params.id }).exec();

    if (!shop) {
        return res.status(204).json({ "message": `No shop matches ID ${req.body.id}.` });;
    }

    let fileName = ''
    let basePath = ''
    if (req?.file) {
        fileName = req.file.filename
        basePath = `${req.protocol}://192.168.1.57:5000/public/uploads/`;
    }

    console.log(shop);
    if (req?.file) shop.image = `${basePath}${fileName}`;
    if (req?.body?.rating) shop.rating = req.body.rating;
    if (req?.body?.numReviews) shop.numReviews = req.body.numReviews;
    if (req?.body?.isFeatured !== shop.isFeatured) shop.isFeatured = req.body.isFeatured;
    if (req?.body?.name) shop.name = req.body.name;
    if (req?.body?.description) shop.description = req.body.description;
    if (req?.body?.address) shop.address = req.body.address;
    if (req?.body?.category) shop.category = req.body.category;
    if (req?.body?.user) shop.user = req.body.user;


    const result = await shop.save();

    res.status(200).json({ success: true, data: result });
}

const deleteShop = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": "ID parameter is required" });


    const shop = await Shops.findOne({ _id: req.params.id }).exec()

    if (!shop) {
        res.status(404).json({ success: false, msg: "Not Found!" });
        return;
    }

    const result = await Shops.deleteOne({ _id: req.params.id })

    res.status(200).json({ success: true, data: result });
}

const getShop = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": "ID parameter is required" });

    const shop = await Shops.findOne({ _id: req.params.id }).exec()

    if (!shop) {
        res.status(404).json({ success: false, msg: "Not Found!" });
        return;
    }

    res.json(shop);
}

module.exports = {
    getAllShops,
    addShop,
    updateShop,
    deleteShop,
    getShop
};