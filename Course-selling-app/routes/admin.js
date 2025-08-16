const adminRouter = express.Router();



adminRouter.post('/signup', (req, res) => {
    res.json({
        message: "signup endpoint"
    })
});

adminRouter.post('/signin', (req, res) => {
    res.json({
        message: "signin endpoint"
    })
});

adminRouter.use(adminMiddleware);

adminRouter.post('/course', (req, res) => {
    res.json({
        message: "course created endpoint"
    })
});

adminRouter.put('/course', (req, res) => {
    res.json({
        message: "course created endpoint"
    })
});


adminRouter.get('/course/all', (req, res) => {
    res.json({
        message: "course created endpoint"
    })
});

module.exports = {
    adminRouter: adminRouter
};