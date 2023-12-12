const sendSuccess = (res, message, data = null) => {
    return res.status(200).json({
      success: true,
      message,
      data,
    });
  };
  
  const sendError = (res, statusCode, message) => {
    return res.status(statusCode).json({
      success: false,
      message,
    });
  };
  
  module.exports = {
    sendSuccess,
    sendError,
  };
  