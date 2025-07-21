const express = require('express');

const app = express();
app.use(express.json());

function isOldEnoughMiddleware(req, res, next){
    if (age >= 16){
        next();
    } else {
        return res.json9({
            msg: "sorry you are not old enough"
        });
    }
}

app.get('/ride1', isOldEnoughMiddleware, (req, res) => {
    res.json({
        msg: "you have ridden the ride 1"
    });
})

app.get('/ride2', isOldEnoughMiddleware, (req, res) => {
    res.json({
        msg: "you have ridden the ride 2"
    });
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})