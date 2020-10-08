const crypto = require('crypto')

const methods = {
  passwordHash: (password) => crypto.createHash('sha1').update(password).digest('hex'),
  validPassword: (password, passwordHash) => methods.passwordHash(password) === passwordHash,
}

module.exports = { ...methods }
