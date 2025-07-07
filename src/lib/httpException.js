const errors = {
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    FORBIDDEN_ERROR: 'FORBIDDEN_ERROR',
    INVALID_TOKEN: 'INVALID_TOKEN',
    TOKEN_EXPIRED: 'TOKEN_EXPIRED',
    TOKEN_REVOKED: 'TOKEN_REVOKED',
    UNAUTHORIZED: 'UNAUTHORIZED',
    UPLOAD_ERROR: 'UPLOAD_ERROR',
};

class HttpException extends Error {
  constructor(status, message = '', error = null, body = null) {
    super(message);
    this.status = status;
    this.message = message;
    this.error = error;
    this.body = body;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
    errors,
    HttpException,
};
