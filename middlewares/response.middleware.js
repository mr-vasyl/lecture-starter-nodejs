const responseMiddleware = (req, res, next) => {
  const success = 200;
  const badRequest = 400;
  const notFound = 404;

  const sendSuccess = (data) => {
    res.status(success).json(data);
  };
  const sendBadRequest = (message) => {
    res.status(badRequest).json({ error: true, message });
  };
  const sendNotFound = (message) => {
    res.status(notFound).json({ error: true, message });
  };

  res.responseMiddleware = { sendSuccess, sendBadRequest, sendNotFound };

  next();
};

export { responseMiddleware };
