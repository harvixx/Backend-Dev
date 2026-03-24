export async function register(req,res,next) {
    try {
       console.log(user)
    } catch (error) {
        error.status=500
        next(error);
    }
}