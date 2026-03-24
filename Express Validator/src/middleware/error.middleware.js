import dotenv from "dotenv"
dotenv.config()
async function errorHandler(err, req, res, next) {
    const response = {
        message: err.message
    };
    if (process.env.NODE_ENVIRONMENT === "development") {
        response.stack = err.stack
    }
    return res.status(err.status).json(
        response
    )
}
export default errorHandler