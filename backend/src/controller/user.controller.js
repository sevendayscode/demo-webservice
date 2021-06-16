'use strict';
const User = require('../model/user.model');

exports.findAll = (req, res) => {
    User.findAll((err, user) => {
        if(err) res.send(err);
        res.send(user);
    })
}

 exports.create = (req, res) => {
    const newUser = new User(req.body);

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        req.status(400).send({ error: true, message: "Please provide all required fields" });
    } else {
        User.create(newUser, (err, user) => {
            if (err) res.send(err);
            res.json({
                error: false,
                message: "User added successfully!",
                data: user,
            });
        });
    }
};

exports.findById = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) res.send(err);
        res.json(user);
    })
}

exports.update = (req, res) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        req.status(400).send({ error: true, message: "Please provide all required fields" });
    } else {
        User.update(req.params.id, new User(req.body), (err, user) => {
            if (err) res.send(err);
            res.json({
                error: false,
                message: `User ${req.params.id} updated successfully!`,
            });
        });
    }
}

exports.delete = (req, res) => {
    User.deleteById(req.params.id, (err, user) => {
        if (err) res.send(err);
        res.json({
            error: false,
            message: `User ${req.params.id} successfully deleted!`,
        });
    })
}