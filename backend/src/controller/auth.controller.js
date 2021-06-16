'use strict';
const User = require('../model/user.model');

exports.login = (req, res) => {
    const user = new User(req.body);
    User.findByEmail(user.email, (err, userResp) => {
        if (err) res.send(err);
        res.json(user);
    });
};
