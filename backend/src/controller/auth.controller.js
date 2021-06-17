'use strict';
const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const user = new User(req.body);

    User.findByEmail(user.email, (err, userResp) => {
        if (err) res.send(err);

        if (userResp.length > 0) {
            
            bcrypt.compare(user.password, userResp[0].PASSWORD, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        response: err
                    });
                }

                if (result) {
                    try {
                        const token = jwt.sign(
                            {
                                user: userResp.email
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: '12hr'
                            }
                        );

                        return res.status(200).json({
                            response: true,
                            token: `Bearer ${token}`,
                            id: userResp.id,
                            email: userResp.email,
                            name: userResp.name,
                            photo: userResp.photo
                        });
                    } catch (error) {
                        res.status(401).json({
                            response: error
                        });
                    }
                }

                return res.status(401).json({
                    response: false
                });
            });
        } else {
            return res.status(401).json({
                response: false
            });
        }


    });
};
