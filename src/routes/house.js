const express = require('express');
const User = require('../models/user');
const Property = require('../models/house');

const router = express.Router();


router.post('/house-upload', async (req, res) => {
    const token = req.headers.authorization.slice(0, req.headers.authorization.length / 2);
    console.log(token);
    const user = await User.findOne({ id: token });
    if (!user) return res.status(404).json("Invalid Token");

    const property = req.body;
    const newProperty = new Property(property);
    await newProperty.save()
        .then(() => { return res.status(200).json(newProperty) })
        .catch((err) => { return res.status(400).json(err) });
})

module.exports = router;