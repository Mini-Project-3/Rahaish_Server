const express = require('express');
const User = require('../models/user');
const Plot = require('../models/plot');

const router = express.Router();


router.post('/plot-upload', async (req, res) => {
    const token = req.headers.authorization.slice(0, req.headers.authorization.length / 2);
    console.log(token);
    const user = await User.findOne({ id: token });
    if (!user) return res.status(404).json("Invalid Token");

    const plot = req.body;
    const newPlot = new Plot(plot);
    await newPlot.save()
        .then(() => { return res.status(200).json(newPlot) })
        .catch((err) => { return res.status(400).json(err) });
})

module.exports = router;