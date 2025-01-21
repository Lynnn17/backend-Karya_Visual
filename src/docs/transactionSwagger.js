/**
 * @swagger
 * tags:
 *   - name: Transactions
 *     description: API untuk mengelola transaksi
 */

/**
 * @swagger
 * /transactions/checkout:
 *   post:
 *     summary: "Create a new transaction"
 *     description: "Create a transaction using the Midtrans API"
 *     tags:
 *       - Transactions
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
 *                       description: "Total amount for the transaction"
 *       400:
 *         description: "Bad request"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid request parameters"
 *       500:
 *         description: "Internal server error"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */

/**
 * @swagger
 * /transactions/notification:
 *   post:
 *     summary: "Receive payment status notifications"
 *     description: "Handle the payment status notification from Midtrans"
 *     tags:
 *       - Transactions
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
 *               transaction_status:
 *                 type: string
 *                 enum: [pending, success, failure, settlement, cancel, expire]
 *                 description: "Transaction status"
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid request parameters"
 *       404:
 *         description: "Transaction not found"
 *       500:
 *         description: "Internal server error"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
