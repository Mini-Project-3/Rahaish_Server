const express = require('express');
const User = require('../models/user');
const Flat = require('../models/flat');

const router = express.Router();


router.post('/flat-upload', async (req, res) => {
    const token = req.headers.authorization.slice(0, req.headers.authorization.length / 2);
    console.log(token);
    const user = await User.findOne({ id: token });
    if (!user) return res.status(404).json("Invalid Token");

    const flat = req.body;
    const newFlat = new Flat(flat);
    await newFlat.save()
        .then(() => { return res.status(200).json(newFlat) })
        .catch((err) => { return res.status(400).json(err) });
});

module.exports = router;
