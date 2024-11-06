const logRequset = (req, res, next) => {
  console.log("log request ke Path", req.path);
  next();
};

module.exports = logRequset;
