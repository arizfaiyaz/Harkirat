const express = require('express');
const app = express();

app.use(express.json());
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
    const numberOfKidneys = johnKidneys.length;
    let numberOFHealthyKidneys = 0;
    
    for (let i = 0; i < numberOfKidneys; i++) {
        if (johnKidneys[i].healthy) {
            numberOFHealthyKidneys++;
        }
    }
     let numberOfunhealthyKidneys = numberOfKidneys - numberOFHealthyKidneys

    res.json({
        numberOfKidneys,
        numberOFHealthyKidneys,
        numberOfunhealthyKidneys
    })
})

app.post('/', (req, res) => {
    const isHelathy = req.body.isHelathy;
    
    users[0].kidneys.push({
        healthy: isHelathy
    });
    res.json({
        msg: "Done"
    });
})


app.listen(3000);