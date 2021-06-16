"use strict";
const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;
const dbConn = require('../../config/db.config');

class Auth {
    static findById = async (empno, result) => {
        var connection;
        try {

            connection = await oracledb.getConnection(dbConn);
            const query = `select * from demo_ords.emp where empno = :empno`;
            await connection.execute(query, [empno], function (err, res) {
                if (err) {
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



module.exports = Auth;