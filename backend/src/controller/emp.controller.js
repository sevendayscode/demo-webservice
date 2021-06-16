'use strict';
const Emp = require('../model/emp.model');

exports.findAll = (req, res) => {
    Emp.findAll((err, emp) => {
        if (err) res.send(err);
        res.send(emp);
    })
}

exports.create = (req, res) => {
    const newEmp = new Emp(req.body);

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        req.status(400).send({ error: true, message: "Please provide all required fields" });
    } else {
        Emp.create(newEmp, (err, emp) => {
            if (err) res.send(err);
            res.json({
                error: false,
                message: "Employee added successfully!",
                data: emp,
            });
        });
    }
};


exports.findById = (req, res) => {
    Emp.findById(req.params.empno, (err, emp) => {
        if (err) res.send(err);
        res.json(emp);
    })
}

exports.update = (req, res) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        req.status(400).send({ error: true, message: "Please provide all required fields" });
    } else {
        Emp.update(req.params.empno, new Emp(req.body), (err, emp) => {
            if (err) res.send(err);
            res.json({
                error: false,
                message: `Employee ${req.params.id} updated successfully!`,
            });
        });
    }
}

exports.delete = (req, res) => {
    Emp.deleteById(req.params.empno, (err, emp) => {
        if (err) res.send(err);
        res.json({
            error: false,
            message: `Employee ${req.params.id} successfully deleted!`,
        });
    })
} 