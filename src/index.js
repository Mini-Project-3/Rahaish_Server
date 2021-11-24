if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const autoIncrement = require('mongoose-auto-increment');
const userRoute = require('./routes/user');
const houseRoute = require('./routes/house');
const { db_url } = require('./Constants/constants');

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const Connection = async () => {
    try {
        const connection = await mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true });
        autoIncrement.initialize(connection);
        console.log("Database Connected Successfully");
    }
    catch (err) {
        console.log("Error while connectin to the database ", err);
    }
}

Connection();

app.use('/', userRoute);
app.use("/", houseRoute);
app.get('/', (req, res) => {
    res.json({ message: "Root route" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("Listening on port ", PORT);
})