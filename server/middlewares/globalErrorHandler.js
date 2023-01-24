const errorHandler = (err, req, res, next) => {
  if (process.env.IS_DEVELOPMENT) {
    res
      .status(err.status || 500)
      .json({ error: true, message: err.message, stack: err.stack });
  } else {
    res.status(err.status || 500).json({ error: true, message: err.message });
  }
};

module.exports = { errorHandler };
