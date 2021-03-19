const { generateRandomUniqueId } = require("../../util");

const mongoose = require("mongoose"),
  productSchema = mongoose.Schema({
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
    ratingProvider: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    productId: {
      type: String,
      required: true,
      default: generateRandomUniqueId(),
    },
  });

module.exports = mongoose.model("Product", productSchema);
