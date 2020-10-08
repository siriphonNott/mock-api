//Base Controller

module.exports = {
  user: () => require('./user')({ Service: require('../services').user() }),
  mozart: () => require('./mozart')({ Service: {} }),
}
