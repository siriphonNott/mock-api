const logger = require('./logger')

module.exports = (isProduction = false, app) => {
  
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    let err = new Error('Endpoint Not Found');
    err.status = 404;
    next(err);
  })

  app.use((err, req, res, next) => {
    if (!isProduction) console.log(err.stack);
    let statusCode = err.status || 500
    let errorBody = {
      status: statusCode,
      message: err.message,
    }
    if(err.code) errorBody.code = err.code
    logger.error(JSON.stringify(errorBody))
    res.status(statusCode);
    res.json({
      error: errorBody
    });
  });

}