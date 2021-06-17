"use strict";
const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;
const dbConn = require('../../config/db.config');
const { hashPassword } = require('../utils');

class User {
    constructor(user) {
        this.email = user.email;
        this.name = user.name;
        this.password = user.password;
        this.about_me = user.about_me;
        this.photo = user.photo;
        this.status = user.status;
    }
    static async findAll(result) {
        var connection;
        try {

            connection = await oracledb.getConnection(dbConn);
            const query = `select id, email, password, about_me, to_char(photo) as photo, status from demo_ords.demo_user`;
            await connection.execute(query, [], function (err, res) {
                if (err) {
                    console.log(err);
                    connection.close();
                }
                result(null, res.rows)
            });
        } catch (err) {
            console.log(err)
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.log(err)
                }
            }
        }
    }
    static async create(newUser, result) {
        const hashedPassword = hashPassword(newUser.password);
        var connection;
        try {

            connection = await oracledb.getConnection(dbConn);
            const query = `insert into demo_ords.demo_user 
                (email, name, password, about_me, photo, status) 
                values
                (:email, :name, :password, :about_me, :photo, :status)
            `;
            await connection.execute(query, [
                newUser.email,
                newUser.name,
                hashedPassword,
                newUser.about_me,
                newUser.photo,
                newUser.status
            ],
                function (err, res) {
                    if (err) {
                        result(null, err)
                        connection.close();
                    }
                    result(null, res)
                });
        } catch (err) {
            console.log(err)
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.log(err)
                }
            }
        }
    }
    static findById = async (id, result) => {
        var connection;
        try {
            connection = await oracledb.getConnection(dbConn);
            const query = `select id,
            email,
            password,
            about_me,
            to_char(photo) as photo,
            status from demo_ords.demo_user where id = :1`;
            await connection.execute(query, [id], function (err, res) {
                if (err) {
                    console.log(err);
                    connection.close();
                }
                result(null, res.rows)
            });
        } catch (err) {
            console.log(err)
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.log(err)
                }
            }
        }
    }
    static update = async (id, user, result) => {
        var connection;
        try {
            connection = await oracledb.getConnection(dbConn);

            let query = `
            update demo_ords.demo_user set 
            email = :email,
            password = :password,
            about_me = :about_me,
            photo = :photo,
            status = :status
            where id = :id`

            await connection.execute(query,
                [user.email,
                hashPassword(user.password),
                user.about_me,
                user.photo,
                user.status,
                    id],
                (err, res) => {
                    if (err) {
                        result(null, err);
                    } else {
                        console.log(res)
                        result(null, res);
                    }
                });

        } catch (err) {
            console.log(err)
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.log(err)
                }
            }
        }
    };

    static deleteById = async (id, result) => {
        var connection;
        try {
            connection = await oracledb.getConnection(dbConn);
            let query = `DELETE FROM demo_ords.demo_user WHERE id = :id`

            await connection.execute(query, [id], (err, res) => {
                if (err) {
                    result(null, err);
                } else {
                    console.log(res)
                    result(null, res);
                }
            });

        } catch (err) {
            console.log(err)
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.log(err)
                }
            }
        }
    }

    static findByEmail = async (email, result) => {
        var connection;
        try {
            connection = await oracledb.getConnection(dbConn);
            const query = `select id, email, password, name, to_char(photo) photo
            from demo_ords.demo_user where email = :1`;
            await connection.execute(query, [email], function (err, res) {
                if (err) {
                    console.log(err);
                    connection.close();
                }
                result(null, res.rows)
            });
        } catch (err) {
            console.log(err)
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.log(err)
                }
            }
        }
    }
}



module.exports = User;