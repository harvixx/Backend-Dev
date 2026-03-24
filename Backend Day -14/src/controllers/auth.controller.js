export async function useRegister(req,res,next) {
    try {
        throw new Error("password is weak");
    } catch (err) {
        err.status=400;
        next(err);
    }
}
