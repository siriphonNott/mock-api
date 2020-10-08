const router = require('express').Router(),
  validator = require('../../validators'),
  controller = require('../../controllers').mozart()

router.get('/', controller.onGetAll)
// router.get('/:id', controller.onGetById)

module.exports = router
