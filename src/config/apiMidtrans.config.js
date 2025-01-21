import dotenv from "dotenv";
import midtransClient from "midtrans-client";

dotenv.config();

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export { snap };
