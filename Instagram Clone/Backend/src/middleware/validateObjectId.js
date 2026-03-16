// middleware/validateObjectId.js
const mongoose = require("mongoose");

function validateObjectId(req, res, next) {
    for (const param in req.params) {
        if (param.endsWith("id")) {  
            if (!mongoose.Types.ObjectId.isValid(req.params[param])) {
                return res.status(400).json({
                    message: `Invalid ${param}`
                });
            }
        }
    }
    next();
}

module.exports = validateObjectId;