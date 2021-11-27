const express = require('express');
const User = require('../models/user');
const Flat = require('../models/flat');

const router = express.Router();

router.post('/flat-upload', async (req, res) => {
    const token = req.headers.authorization.slice(0, req.headers.authorization.length / 2);

    const user = await User.findOne({ _id: token });
    if (!user) return res.status(404).json("Invalid Token");

    const flat = req.body;
    const newFlat = new Flat({ ...flat, owner_id: user.user_id, owner: user._id });
    await newFlat.save().then(async (flat) => {
        user.flat.push(flat._id);
        user.save();
    });

    await Flat.find({ user_id: user.user_id }).populate('owner').then((f) => {
        return res.status(200).json(f);
    });
});

router.get('/my-flat', async (req, res) => {
    const token = req.headers.authorization.slice(0, req.headers.authorization.length / 2);

    const user = await User.findOne({ _id: token });
    if (!user) return res.status(404).json("Invalid Token");

    await Flat.find({ owner: user._id }).populate({ path: "owner", select: "firstName lastName" }).then((flat) => {
        return res.status(200).json(flat);
    });
});

router.get('/all-flats', async (req, res) => {
    const offset = req.query.offset ? req.query.offset : 1;
    const limit = req.query.limit ? req.query.limit : 20;

    await Flat.find({}).populate({ path: "owner", select: "firstName lastName email" }).then((flats) => {
        const start = limit * (offset - 1);
        const end = parseInt(start) + parseInt(limit);
        return res.status(200).json(flats.slice(start, end));
    });
});

router.get('/flat-one', async (req, res) => {
    const flat_id = req.query.flat_id;

    await Flat.findOne({ flat_id: flat_id }).populate({ path: "owner", select: "firstName lastName email" }).then((flat) => {
        return res.status(200).json(flat);
    });
});

module.exports = router;
