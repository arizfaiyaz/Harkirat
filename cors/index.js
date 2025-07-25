const express = require('express');

const app = express();

app.post('/sum', (req, res) => {
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    res.json({
        answer: a + b
    })
})