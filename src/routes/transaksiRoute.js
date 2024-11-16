const express = require("express");
const router = express.Router();
const {
  checkout,
  notification,
} = require("../controllers/transaksiController.js");

/**
 * @swagger
 * /transaksi/checkout:
 *   post:
 *     summary: "Create a new transaction"
 *     description: "Create a transaction using the Midtrans API"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: string
 *                 description: "Order ID for the transaction"
 *               productName:
 *                 type: string
 *                 description: "Name of the product"
 *               price:
 *                 type: number
 *                 format: float
 *                 description: "Price of the product"
 *               quantity:
 *                 type: integer
 *                 description: "Quantity of the product"
 *             required:
 *               - order_id
 *               - productName
 *               - price
 *               - quantity
 *     responses:
 *       200:
 *         description: "Transaction created successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Transaction created successfully"
 *                 payment_url:
 *                   type: string
 *                   example: "https://payment.midtrans.com"
 *                 transaction:
 *                   type: object
 *                   properties:
 *                     order_id:
 *                       type: string
 *                     nama:
 *                       type: string
 *                     gross_amount:
 *                       type: number
 *       400:
 *         description: "Bad request"
 *       500:
 *         description: "Internal server error"
 */
router.post("/checkout", checkout);

/**
 * @swagger
 * /transaksi/notification:
 *   get:
 *     summary: "Receive payment status notifications"
 *     description: "Handle the payment status notification from Midtrans"
 *     parameters:
 *       - in: query
 *         name: order_id
 *         required: true
 *         schema:
 *           type: string
 *         description: "Order ID for the transaction"
 *       - in: query
 *         name: transaction_status
 *         required: true
 *         schema:
 *           type: string
 *         description: "Transaction status (pending, success, failure, etc.)"
 *     responses:
 *       200:
 *         description: "Transaction status updated successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Transaction status updated successfully"
 *                 transaction:
 *                   type: object
 *                   properties:
 *                     order_id:
 *                       type: string
 *                     transaction_status:
 *                       type: string
 *       400:
 *         description: "Missing or invalid parameters"
 *       404:
 *         description: "Transaction not found"
 *       500:
 *         description: "Internal server error"
 */
router.get("/notification", notification);

module.exports = router;
