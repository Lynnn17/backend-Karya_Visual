require("dotenv").config(); // Pastikan dotenv dipanggil untuk memuat variabel lingkungan

const midtransClient = require("midtrans-client");

exports.coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});
