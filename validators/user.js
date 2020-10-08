const { check } = require('express-validator')

module.exports = {
  login: [
    check('username').notEmpty().withMessage('is empty').isLength({ min: 4 }).withMessage('is at least 4 characters'),
    check('password').notEmpty().withMessage('is empty').isLength({ min: 8 }).withMessage('is at least 8 characters'),
  ],

  register: [
    check('username').notEmpty().withMessage('is empty').isLength({ min: 4 }).withMessage('is at least 4 characters'),
    check('email').notEmpty().withMessage('is empty').isEmail().withMessage('must be email'),
    check('password').notEmpty().withMessage('is empty').isLength({ min: 8 }).withMessage('is at least 8 characters'),
  ],

  changePassword: [
    check('oldPassword').notEmpty().withMessage('is empty').isLength({ min: 8 }).withMessage('is at least 8 characters'),
    check('newPassword').notEmpty().withMessage('is empty').isLength({ min: 8 }).withMessage('is at least 8 characters'),
  ],
}
