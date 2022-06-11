const OrderItem = require('../model/OrderItem.js');
const Orders = require('../model/Orders.js');

const getAllOrder = async (req, res) => {

    const order = await Orders.find().populate('user', 'name').sort({ 'dateOrdered': -1 });
    if (!order) return res.status(204).json({ 'message': 'No orders found.' });

    res.json(order);
}

const addOrder = async (req, res) => {

    const { phone, address, payment, user, orderItems } = req.body;

    // console.log(req.body);
    if (!phone || !address || !payment || !user || !orderItems) {
        // console.log("NGEK");
        return res.status(400).json({ 'message': 'Please provide credentials' });
    }

    const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem) => {
        const newOrderItem = await OrderItem.create({
            quantity: orderItem.quantity,
            product: orderItem.product,
        })

        // console.log(newOrderItem._id);
        return newOrderItem._id;
    }));

    const orderItemIdsResolved = await orderItemsIds;
    console.log('ProductIds:', orderItemIdsResolved);

    const price = Promise.all(orderItemIdsResolved.map(async (id) => {
        const orderItem = await OrderItem.find({ _id: id }).populate('product', 'price')
        let total = 0;
        for (let product of orderItem) {
            total += (product.product.price * product.quantity)
        }
        return total;
    }))
    let totalPrice = await price;
    totalPrice = totalPrice.reduce((a, b) => a + b, 0)

    try {
        const result = await Orders.create({
            city: req.body.city,
            phone: req.body.phone,
            status: req.body.status,
            dateOrdered: Date.now(),
            address: req.body.address,
            payment: req.body.payment,
            user: req.body.user,
            totalPrice: totalPrice,
            orderItems: orderItemIdsResolved,
            shop: req.body.shop
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
    // res.status(201).json({ msg: 'Testing' });
}

const updateOrder = async (req, res) => {

    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required' });
    }

    const order = await Orders.findOne({ _id: req.params.id }).exec();

    if (!order) {
        return res.status(204).json({ "message": `No order matches ID ${req.params.id}.` });;
    }

    if (req?.body?.status) order.status = req.body.status;

    const result = await order.save();

    res.status(200).json({ success: true, data: result });
}

const deleteOrder = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": "ID parameter is required" });


    const order = await Orders.findOne({ _id: req.params.id }).exec()

    if (!order) {
        res.status(404).json({ success: false, msg: "Not Found!" });
        return;
    }
    // console.log(order.orderItems)
    const orderItems = await OrderItem.deleteMany({ _id: order.orderItems })

    const result = await Orders.deleteOne({ _id: req.params.id })

    res.status(200).json({ success: true, data: { orderItems, result } });
}

const getOrder = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": "ID parameter is requird" });

    const order = await Orders.find({ _id: req.params.id }).populate('user', 'name').populate({ path: 'orderItems', populate: 'product' })
    // console.log(order)
    if (!order) {
        res.status(404).json({ success: false, msg: "Not Found!" });
        return;
    }

    res.json(order);
}

const getTotalSales = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": "ID parameter is requird" });

    const order = await Orders.find({ shop: req.params.id })

    let totalSales = order.map((i) => {
        return i.totalPrice
    })
    totalOrders = totalSales.length
    totalSales = totalSales.reduce((a, b) => a + b, 0)

    // if (!totalSales) {
    //     return res.status(400).send('The order sales cannot be generated')
    // }

    res.status(200).send({ totalSales: totalSales, totalOrders: totalOrders })
}

module.exports = {
    getAllOrder,
    addOrder,
    updateOrder,
    deleteOrder,
    getOrder,
    getTotalSales
};