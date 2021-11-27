const express = require('express');
const User = require('../models/user');
const House = require('../models/house');

const router = express.Router();

router.post('/house-upload', async (req, res) => {
    const token = req.headers.authorization.slice(0, req.headers.authorization.length / 2);

    const user = await User.findOne({ _id: token });
    if (!user) return res.status(404).json("Invalid Token");

    const house = req.body;
    const newHouse = new House({ ...house, owner_id: user.user_id, owner: user._id });
    await newHouse.save().then(async (house) => {
        user.house.push(house._id);
        user.save();
    });

    await House.find({ user_id: user.user_id }).populate('owner').then((h) => {
        return res.status(200).json(h);
    });
});

router.get('/my-house', async (req, res) => {
    const token = req.headers.authorization.slice(0, req.headers.authorization.length / 2);

    const user = await User.findOne({ _id: token });
    if (!user) return res.status(404).json("Invalid Token");

    await House.find({ owner: user._id }).populate({ path: "owner", select: "firstName lastName" }).then((house) => {
        return res.status(200).json(house);
    })
})

router.get('/all-houses', async (req, res) => {
    const offset = req.query.offset ? req.query.offset : 1;
    const limit = req.query.limit ? req.query.limit : 20;

    await House.find({}).populate({ path: "owner", select: "firstName lastName email" }).then((houses) => {
        const start = limit * (offset - 1);
        const end = parseInt(start) + parseInt(limit);
        return res.status(200).json(houses.slice(start, end));
    });
});

router.get('/house-one', async (req, res) => {
    const house_id = req.query.house_id;

    await House.findOne({ house_id: house_id }).populate({ path: "owner", select: "firstName lastName email" }).then((house) => {
        return res.status(200).json(house);
    });
});

module.exports = router;