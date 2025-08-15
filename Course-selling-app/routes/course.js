const Router =  express.Router();
const courseRouter = Router();

courseRouter.post('/purchase', (req, res) => {
    // you would expect the user to pay you the money
    res.json({
        message: "course endpoint"
    })
});


courseRouter.get('/preview', (req, res) => {
    res.json({
        message: "course endpoint"
    })
});



module.exports = {
    courseRouter: courseRouter
}