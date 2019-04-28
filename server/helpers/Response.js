class Response {
  static success(res, status, data) {
    return res.status(status)
      .json({
        status,
        data,
      });
  }

  static error(res, status, message) {
    return res.status(status)
      .json({
        status,
        error: message,
      });
  }

  static error500(res) {
    return res.status(500)
      .json({
        status: 500,
        error: 'Something went wrong',
      });
  }

  static error403(res) {
    return res.status(403)
      .json({
        status: 403,
        error: 'You are not Authorize to perform this operation',
      });
  }

  static successMessage(res, status, message) {
    return res.status(status)
      .json({
        status,
        message,
      });
  }
}


export default Response;
