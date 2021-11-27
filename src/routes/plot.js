const express = require('express');
const User = require('../models/user');
const Plot = require('../models/plot');

const router = express.Router();

router.post('/plot-upload', async (req, res) => {
    const token = req.headers.authorization.slice(0, req.headers.authorization.length / 2);

    const user = await User.findOne({ _id: token });
    if (!user) return res.status(404).json("Invalid Token");

    const plot = req.body;
    const newPlot = new Plot({ ...plot, owner_id: user.user_id, owner: user._id });
    await newPlot.save().then(async (plot) => {
        user.plot.push(plot._id);
        user.save();
    });

    await Plot.find({ user_id: user.user_id }).populate('owner').then((p) => {
        return res.status(200).json(p);
    });
});

router.get('/my-plot', async (req, res) => {
    const token = req.headers.authorization.slice(0, req.headers.authorization.length / 2);

    const user = await User.findOne({ _id: token });
    if (!user) return res.status(404).json("Invalid Token");

    await Plot.find({ owner: user._id }).populate({ path: "owner", select: "firstName lastName" }).then((plot) => {
        return res.status(200).json(plot);
    });
})

router.get('/all-plots', async (req, res) => {
    const offset = req.query.offset ? req.query.offset : 1;
    const limit = req.query.limit ? req.query.limit : 20;

    await Plot.find({}).populate({ path: "owner", select: "firstName lastName email" }).then((plots) => {
        const start = limit * (offset - 1);
        const end = parseInt(start) + parseInt(limit);
        return res.status(200).json(plots.slice(start, end));
    });
});

router.get('/plot-one', async (req, res) => {
    const plot_id = req.query.house_id;

    await Plot.findOne({ plot_id: plot_id }).populate({ path: "owner", select: "firstName lastName email" }).then((plot) => {
        return res.status(200).json(plot);
    });
});

module.exports = router;