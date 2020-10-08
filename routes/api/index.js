const router = require('express').Router(),
  logger = require('../../configs/logger')

router.use('/users', require('./user'))
router.use('/mozart', require('./mozart'))

module.exports = router
