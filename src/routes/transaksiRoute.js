module.exports = (app) => {
  const controller = require("../controllers/transaksiController.js");

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept, Authorization"
    );
    next();
  });

  app.post(
    "/midtrans-transaction/charge",
    controller.midtransChargeTransaction
  );
};
