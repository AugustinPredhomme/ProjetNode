export default function errorMiddleware(err, req, res, next) {
  console.error(err.stack);

  let statusCode = 500;
  if (err.status) {
    statusCode = err.status;
  }

  res
    .status(statusCode)
    .json({ message: err.message || "Internal server error" });
}
