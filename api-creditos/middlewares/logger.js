const logger = (req, res, next) => {
    console.log(
        `[${new Date().toISOString()}] ${req.method} - ${req.originalUrl} - Body:`,
        req.body
    );

    next();
};

module.exports = logger;