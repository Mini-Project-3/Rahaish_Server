if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const Connection = async () => {
    const db_url = "mongodb+srv://ayush:rahaish3@rahaish.hplmj.mongodb.net/Rahaish?retryWrites=true&w=majority";
    try {
        await mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database Connected Successfully");
    }
    catch (err) {
        console.log("Error while connectin to the database ", err);
    }
}

Connection();

app.get('/', (req, res) => {
    res.json({ message: "Root route" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("Listening on port ", PORT);
})