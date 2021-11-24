const express = require('express');
const User = require('../models/user');
const House = require('../models/house');
const user = require('../models/user');

const router = express.Router();


router.post('/house-upload', async (req, res) => {
    const token = req.headers.authorization.slice(0, req.headers.authorization.length / 2);

    const user = await User.findOne({ id: token });
    if (!user) return res.status(404).json("Invalid Token");

    const house = req.body;
    const newHouse = new House({ ...house, user_id: user.user_id });
    await newHouse.save((err, house) => {
        if (err) res.status(400).json(err);
        user.house.push(house.house_id);
        user.save();
        return res.status(200).json(house);
    });
});

router.get('/my-house', async (req, res) => {
    const token = req.headers.authorization.slice(0, req.headers.authorization.length / 2);

    const user = await User.findOne({ id: token });
    if (!user) return res.status(404).json("Invalid Token");

    const house = await House.find({ user_id: user.user_id }, (err, houses) => {
        if (err) return res.status(404).json(err);
        return res.status(200).json({ houses: houses, user: user });
    });
})

router.get('/all-house', async (req, res) => {
    const house = await House.find({}, (err, houses) => {
        if (err) return res.status(404).json(err);
        return res.status(200).json({ houses: houses });
    })
}); //incomplete

router.get('/house-one', async (req, res) => {
    const house_id = req.query.house_id;

    const house = await House.findOne({ house_id: house_id }, async (err, houses) => {
        console.log(houses);
        if (err) return res.status(404).json(err);
        const user = await User.findOne({ user_id: houses.user_id });
        return res.status(200).json({ house: houses, user: user });
    });
})

module.exports = router;