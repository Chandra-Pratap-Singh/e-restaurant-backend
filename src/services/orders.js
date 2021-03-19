const Order = require("../db/models/order");

exports.addOrderToDb = (newOrder) => {
  const order = new Order({ ...newOrder });
  return order.save();
};

exports.getOrderListFromDb = (filters = {}, fields) => {
  return Order.find({ ...filters }, fields);
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
