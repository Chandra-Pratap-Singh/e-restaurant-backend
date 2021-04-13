const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  orderedDateTime: { type: Date, required: true },
  deliveryDateTime: Date,
  customer: {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    snapshot: {
      userId: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
      },
      address: {
        name: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true,
        },
        email: {
          type: String,
        },
        address: {
          type: String,
          required: true,
        },
      },
    },
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      snapshot: {
        name: {
          type: String,
          required: true,
        },
        img: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        rating: Number,
        ratingProvider: Number,
        description: {
          type: String,
          required: true,
        },
        category: [
          {
            type: String,
            required: true,
          },
        ],
        productId: {
          type: String,
          required: true,
        },
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    required: true,
  },
  history: [
    {
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
        required: true,
      },
      time: {
        type: Date,
        required: true,
      },
      comment: String,
    },
  ],
});

module.exports = mongoose.model("Order", OrderSchema);
