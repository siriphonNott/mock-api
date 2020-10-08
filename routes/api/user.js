const router = require('express').Router(),
  auth = require('../auth'),
  validator = require('../../validators'),
  controller = require('../../controllers').user()

router.get('/', auth.required, controller.onGetAll)
router.get('/:id', auth.required, controller.onGetById)
router.post('/', auth.required, [validator.user.register, validator.check], controller.onInsert)
router.put('/:id', auth.required, controller.onUpdate)
router.delete('/:id', auth.required, controller.onDelete)
router.post('/login', [validator.user.login, validator.check], controller.onLogin)
router.post('/register', [validator.user.register, validator.check], controller.onRegister)
router.post('/refresh-token', auth.required, controller.onRefreshToken)
router.post(
  '/change-password',
  auth.required,
  [validator.user.changePassword, validator.check],
  controller.onChangePasword
)

module.exports = router
