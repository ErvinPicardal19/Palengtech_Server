const Orders = require('../model/Orders.js');

const getAllOrder = async (req, res) => {

    if (!req?.body?.user) {
        // console.log("NGEK");
        return res.status(400).json({ 'message': 'Please provide credentials' });
    }

    const order = await Orders.find({ user: req.body.user });
    if (!order) return res.status(204).json({ 'message': 'No orders found.' });
    res.json(order);
}

const addOrder = async (req, res) => {
    console.log(req.body);
    if (!req?.body?.name || !req?.body?.phone || !req?.body?.address || !req?.body?.payment || !req?.body?.total || !req?.body?.user) {
        // console.log("NGEK");
        return res.status(400).json({ 'message': 'Please provide credentials' });
    }

    try {
        const result = await Orders.create({
            city: req.body.city,
            name: req.body.name,
            phone: req.body.phone,
            isDelivered: req.body.isDelivered,
            date: req.body.date,
            address: req.body.address,
            payment: req.body.payment,
            total: req.body.total,
            user: req.body.user,
        });

        res.status(201).json(result);
    } catch (err) {
        console.log(err);
    }
}

const updateOrder = async (req, res) => {

    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required' });
    }

    const order = await Orders.findOne({ _id: req.body.id }).exec();

    if (!order) {
        return res.status(204).json({ "message": `No order matches ID ${req.body.id}.` });;
    }

    if (req?.body?.city) order.city = req.body.city;
    if (req?.body?.name) order.name = req.body.name;
    if (req?.body?.phone) order.phone = req.body.phone;
    if (req?.body?.isDelivered) order.isDelivered = req.body.isDelivered;
    if (req?.body?.date) order.date = req.body.date;
    if (req?.body?.address) order.address = req.body.address;
    if (req?.body?.payment) order.payment = req.body.payment;
    if (req?.body?.total) order.total = req.body.total;
    if (req?.body?.user?.userID) order.user.userID = req.body.user.userID;


    const result = await order.save();

    res.status(200).json({ success: true, data: result });
}

const deleteOrder = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": "ID parameter is required" });


    const order = await Orders.findOne({ _id: req.body.id }).exec()

    if (!order) {
        res.status(404).json({ success: false, msg: "Not Found!" });
        return;
    }

    const result = await Orders.deleteOne({ _id: req.body.id })

    res.status(200).json({ success: true, data: result });
}

const getOrder = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": "ID parameter is required" });

    const order = await Orders.find({ _id: req.params.id })

    if (!order) {
        res.status(404).json({ success: false, msg: "Not Found!" });
        return;
    }

    res.json(order);
}

module.exports = {
    getAllOrder,
    addOrder,
    updateOrder,
    deleteOrder,
    getOrder
};