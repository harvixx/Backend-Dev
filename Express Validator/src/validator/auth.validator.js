import { body,validationResult } from "express-validator";

function validate(req, res, next) {

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next()
    }
    res.status(400).json({
        errors: errors.array()
    })
}


export const registerValidator=[
    body("username").isString().withMessage("usename must be string"),
    body("email").isEmail().withMessage("email format must correct"),
    validate
]
