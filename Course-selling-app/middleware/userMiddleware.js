function userMiddleware(req, res, next) {
    console.log('Session:', req.session);

    if(req.session && req.session.user) {
        req.userId = req.session.userId;
        return next();
    }

    return res.status(401).json({
        message: "unauthorized",
    });
};


module.exports = {
    userMiddleware, 
};