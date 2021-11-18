const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const alreadyExistUser = await User.findOne({ email: email });

    if (alreadyExistUser) return res.status(409).json("Email already exist!!");

    const newUser = new User({ firstName, lastName, email, password });
    const savedUser = await newUser.save().catch((err) => {
        if (err) console.log("Error: ", err);
        return res.status(401).json({ err: err });
    })

    if (savedUser) res.status(200).json({ ...savedUser, token: savedUser.id + savedUser.id });
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) return res.status(404).json("Email or password is wrong!!");

    if (user.password === password) return res.status(200).json({ ...user, token: user.id + user.id });
    else return res.status(404).json("Email or password is wrong!!");
})

module.exports = router;