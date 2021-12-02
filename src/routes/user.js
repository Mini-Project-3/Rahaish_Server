const express = require('express');
const User = require('../models/user');
const House = require('../models/house');
const Flat = require('../models/flat');
const Plot = require('../models/plot');

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
});

router.get("/me", async (req, res) => {
    const token = req.headers.authorization.slice(0, req.headers.authorization.length / 2);

    await User.findOne({ _id: token }, "firstName lastName email").populate('house').populate('plot').populate('flat').then((user) => {
        return res.status(200).json(user);
    }).catch((err) => {
        return res.status(401).json(err);
    })
});

router.get("/house-creator", async (req, res) => {
    const house_id = req.query.house_id;

    await House.findOne({ house_id: house_id }).populate('owner').then((house) => {
        return res.status(200).json(house.owner);
    }).catch((err) => {
        return res.status(401).json(err);
    })
});

router.get("/flat-creator", async (req, res) => {
    const flat_id = req.query.flat_id;
    await Flat.findOne({ flat_id: flat_id }).populate('owner').then((flat) => {
        return res.status(200).json(flat.owner);
    }).catch((err) => {
        return res.status(401).json(err);
    })
});

router.get("/plot-creator", async (req, res) => {
    const plot_id = req.query.plot_id;

    await Plot.findOne({ plot_id: plot_id }).populate('owner').then((plot) => {
        return res.status(200).json(plot.owner);
    }).catch((err) => {
        return res.status(401).json(err);
    })
});


module.exports = router;