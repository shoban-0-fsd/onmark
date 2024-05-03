const responseHandler = (res, status, data) => {
  res.status(status).json(data);
};

module.exports = responseHandler;
