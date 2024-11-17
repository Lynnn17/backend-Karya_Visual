const Joi = require("joi");
const db = require("../models");
const Transaksi = db.Transaksi;
const { snap } = require("../config/apiMidtrans.config.js");

const checkout = async (req, res) => {
  try {
    const schema = Joi.object({
      order_id: Joi.string().required().messages({
        "string.empty": "Order ID is required.",
        "any.required": "Order ID is required.",
      }),
      productName: Joi.string().required().messages({
        "string.empty": "Product name is required.",
        "any.required": "Product name is required.",
      }),
      price: Joi.number().positive().required().messages({
        "number.base": "Price must be a number.",
        "number.positive": "Price must be greater than zero.",
        "any.required": "Price is required.",
      }),
      quantity: Joi.number().integer().positive().required().messages({
        "number.base": "Quantity must be a number.",
        "number.integer": "Quantity must be an integer.",
        "number.positive": "Quantity must be greater than zero.",
        "any.required": "Quantity is required.",
      }),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: "Validation error",
        details: error.details.map((detail) => detail.message),
      });
    }
    const { order_id, productName, price, quantity } = req.body;

    if (!order_id || !productName || !price || !quantity) {
      return res.status(400).json({
        message:
          "Order ID, Product Amount, Quantity, and Price Details are required.",
      });
    }

    let parameter = {
      transaction_details: {
        order_id: order_id,
        gross_amount: price * quantity,
      },
      item_details: [
        {
          price: price,
          quantity: quantity,
          name: productName,
        },
      ],
    };

    const transaction = await snap.createTransaction(parameter);

    const newTransaction = await Transaksi.create({
      order_id: order_id,
      nama: productName,
      gross_amount: price * quantity,
      transaction_status: "pending",
      response_midtrans: JSON.stringify(transaction),
    });

    return res.status(200).json({
      message: "Transaction created successfully",
      payment_url: transaction.redirect_url,
      transaction: {
        order_id: newTransaction.order_id,
        nama: newTransaction.nama,
        gross_amount: newTransaction.gross_amount,
      },
    });
  } catch (error) {
    console.error("Error while processing Midtrans charge:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const notification = async (req, res) => {
  try {
    const schema = Joi.object({
      order_id: Joi.string().required().messages({
        "string.empty": "Order ID is required.",
        "any.required": "Order ID is required.",
      }),
      productName: Joi.string().required().messages({
        "string.empty": "Product name is required.",
        "any.required": "Product name is required.",
      }),
      price: Joi.number().positive().required().messages({
        "number.base": "Price must be a number.",
        "number.positive": "Price must be greater than zero.",
        "any.required": "Price is required.",
      }),
      quantity: Joi.number().integer().positive().required().messages({
        "number.base": "Quantity must be a number.",
        "number.integer": "Quantity must be an integer.",
        "number.positive": "Quantity must be greater than zero.",
        "any.required": "Quantity is required.",
      }),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: "Validation error",
        details: error.details.map((detail) => detail.message),
      });
    }

    const { order_id, transaction_status } = req.query;

    if (!order_id || !transaction_status) {
      return res
        .status(400)
        .json({ message: "Missing order_id or transaction_status" });
    }

    const transaction = await Transaksi.findOne({ where: { order_id } });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    switch (transaction_status) {
      case "pending":
        transaction.transaction_status = "pending";
        break;
      case "success":
        transaction.transaction_status = "success";
        break;
      case "failure":
        transaction.transaction_status = "failure";
        break;
      case "settlement":
        transaction.transaction_status = "settlement";
        break;
      case "cancel":
        transaction.transaction_status = "cancel";
        break;
      case "expire":
        transaction.transaction_status = "expired";
        break;
      default:
        return res.status(400).json({ message: "Invalid transaction status" });
    }

    await transaction.save();

    return res.status(200).json({
      message: "Transaction status updated successfully",
      transaction: transaction,
    });
  } catch (error) {
    console.error("Error processing payment success:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { checkout, notification };
