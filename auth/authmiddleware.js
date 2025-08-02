
// auth middleware
const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        res.send({
            message: "you are not authenticated"
        });
    }
}