const baseService = require('./baseService')

// Export Services
module.exports = {
  user: () => require('./user')({ ...baseService, ...require('../models/User') }),
}
