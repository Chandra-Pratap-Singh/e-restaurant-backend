const Order = require("../db/models/order");

exports.addOrderToDb = (newOrder) => {
  const order = new Order({ ...newOrder });
  return order.save();
};

exports.countOrdersInDb = (filters = {}) => {
  return Order.find({ ...filters }).count();
};

exports.getOrderListFromDb = (filters = {}, fields, skip = 0, limit = null) => {
  return Order.find({ ...filters }, fields)
    .sort("-orderedDateTime")
    .skip(skip)
    .limit(limit)
    .populate("customer.customer products.product");
};

exports.getOrderFromDb = (filter = {}, fields) => {
  return !!filter._id
    ? Order.findById(filter._id, fields)
    : Order.findOne({ ...filter }, fields);
};

exports.updateOrderInDb = (updatedOrder) => {
  const { _id, orderId } = updatedOrder;
  return _id
    ? Order.findByIdAndUpdate(_id, updatedOrder, { new: true })
    : Order.findOneAndUpdate({ orderId }, updatedOrder, { new: true });
};
