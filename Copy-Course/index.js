const express = require('express');
const app = express();

const connectDb = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log("Connected to the database successsful");

        const port = process.env.PORT || 3000;

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
        
    } catch (error) {
        console.error("connection to db failed");
        process.exit(1);
    }
};


connectDb();