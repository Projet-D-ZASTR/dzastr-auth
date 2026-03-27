export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || '500 Error, something went wrong';

  return res.status(status).json({ message });
};