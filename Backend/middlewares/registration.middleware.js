const { body, validationResult } = require("express-validator");



const SignupRules=[
    body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ max: 80 }).withMessage("Name must be under 80 characters"),

    body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
    .matches(/[A-Za-z]/).withMessage("Password must contain a letter")
    .matches(/\d/).withMessage("Password must contain a number")
]

function SignupValidation(req,res,next) {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(422).json({
            "status":"SignUp Failed. Try again"
        })
    }

    next()
}

module.exports={SignupRules,SignupValidation}