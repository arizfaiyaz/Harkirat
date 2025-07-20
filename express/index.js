const express = require('express');
const app = express();

const users = [
    {
        name: "John",
        kidneys: [{
            healthy: false
        }]
    }
];

app.get("/", (req, res)=> {
    const johnKidneys =  users[0].kidneys;
    const numberOfKidneys = johnKidneys.lenght;
    let numberOFHealthyKidneys = 0;
    for (let i = 0; i < numberOfKidneys; i++) {
        if (johnKidneys[i].healthy) {
            numberOFHealthyKidneys++;
        }
    }
    res.json({
        numberOfKidneys,
        numberOFHealthyKidneys
    })
})

app.listen(3000);