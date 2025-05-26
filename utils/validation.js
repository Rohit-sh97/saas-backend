const { check, validationResult } = require('express-validator');

exports.signupValidationRules = [
  check('fullName').notEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Valid email is required'),
  check('phone')
    .notEmpty().withMessage('Phone number is required')
    .isMobilePhone().withMessage('Valid phone number is required'),
  check('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
