const { check, validationResult } = require('express-validator')
const Category = require('../models/category')

const userValidator = [
  check('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.'),
  check('email')
    .notEmpty()
    .withMessage('Email is required.')
    .bail()
    .isEmail()
    .withMessage('Please enter valid email.'),
  check('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required.')
    .bail()
    .isLength({ min: 8, max: 15 })
    .withMessage('Please enter valid password between 8 to 15 characters.'),
  check('confirmPassword')
    .trim()
    .notEmpty()
    .withMessage('ConfirmPassword is required')
    .bail()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("The passwords do not match"),

  async (req, res, next) => {
    const result = validationResult(req)
    const errors = []
    result.array().map(err => errors.push({ message: err.msg }))
    if (!result.isEmpty()) {
      return await res.render('register', { errors, ...req.body })
    } else {
      next()
    }
  }
]

const recordValidator = [
  check('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.'),
  check('date')
    .notEmpty()
    .withMessage('Date is required.'),
  check('categoryId')
    .notEmpty()
    .withMessage('Must be selected.'),
  check('amount')
    .trim()
    .notEmpty()
    .withMessage('Amount is required.')
    .bail()
    .isNumeric()
    .withMessage('Must be a number.')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Amount must be greater than 0 and with no decimal places.'),

  async (req, res, next) => {
    const result = validationResult(req)
    const errors = []
    result.array().map(err => errors.push({ message: err.msg }))
    if (!result.isEmpty()) {
      await Category.find()
        .lean()
        .then((categories) => {
          const category = categories.find((category) => {
            return (category._id.toString() === req.body.categoryId)
          })
          const _id = req.params.id
          if (!_id) {
            const record =  req.body
            return res.render('new', { record, categories, category, errors }) 
          } else {
            const record = Object.assign({ _id }, req.body)
            return res.render('edit', { record, categories, category, errors }) 
          }
        })
    } else {
      next()
    }
  }
]

module.exports = { userValidator, recordValidator }