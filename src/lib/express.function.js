function returnResponse(res, status, message, error) {
    const safeStatus = typeof status === 'number' ? status : 500;
    return res.status(safeStatus).json({
        status: safeStatus,
        message: message || 'Internal Server Error',
        error,
    });
}

module.exports = {
    returnResponse,
};
