import { check } from 'express-validator';

// export const userSignupValidator = (req, res, next) => {
//   req.check('name', 'Name is required').notEmpty();
//   req.check('email', 'Email must be between 3 to 32 characters')
//       .match(/.+\@.+\..+/)
//       .withMessage('Email must contain @')
//       .isLength({
//         min: 4,
//         max: 32
//       });
//   req.check('password', 'Password is required').notEmpty();
//   req.check('password')
//       .isLength({ min: 6 })
//       .withMessage('Password must contain at least 6 characters')
//       .match(/\d/)
//       .withMessage('Password must contain a number');
//       const errors = req.validationError();
//       if(errors){
//         const firstError = errors.map(error => error.message)[0];
//         return res.status(400).json({ error: firstError });
//       }
//   // necessary to call next() to continue...
//   next();
// }

export const userSignupValidator = () => {
  return (
    [
      check('name')
        .not().isEmpty().withMessage('Name is required'),
      check('email', 'Your email is not valid')
        .not().isEmpty().isEmail().normalizeEmail().withMessage('Invalid email format')
        .isLength({ min: 5, max: 32 }).withMessage('Eamil must be between 3 to 32 characters'),
      check('password')
      .isLength({ min: 5 }).withMessage('must be at least 5 chars long')
      .matches(/\d/).withMessage('must contain a number')
    ]
  )
}