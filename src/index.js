if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/user');
const houseRoute = require('./routes/house');
const plotRoute = require('./routes/plot');
const flatRoute = require('./routes/flat');
const { db_url } = require('./Constants/constants');

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const Connection = async () => {
    try {
        await mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database Connected Successfully");
    }
    catch (err) {
        console.log("Error while connectin to the database ", err);
    }
}

Connection();

app.use('/', userRoute);
app.use("/", houseRoute);
app.use("/", plotRoute);
app.use("/", flatRoute);
app.get('/', (req, res) => {
    res.json({ message: "Root route" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("Listening on port ", PORT);
})