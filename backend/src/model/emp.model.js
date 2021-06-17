"use strict";
const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;
const dbConn = require('../../config/db.config');

class Emp {
    constructor(emp) {
        this.empno = emp.empno;
        this.ename = emp.ename;
        this.job = emp.job;
        this.mgr = emp.mgr;
        this.hiredate = emp.hiredate;
        this.sal = emp.sal;
        this.comm = emp.comm;
        this.deptno = emp.deptno;
    }
    static async findAll(result) {
        var connection;
        try {

            connection = await oracledb.getConnection(dbConn);
            const query = `select * from demo_ords.emp`;
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

    static async create(newEmp, result) {
        var connection;
        try {

            connection = await oracledb.getConnection(dbConn);
            const query = `insert into demo_ords.emp 
                (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO) 
                values
                (:empno, :ename, :job, :mgr, to_date(:hiredate, 'dd-mon-yy'), :sal, :comm, :deptno)
            `;
            await connection.execute(query, [
                newEmp.empno,
                newEmp.ename,
                newEmp.job,
                newEmp.mgr,
                newEmp.hiredate,
                newEmp.sal,
                newEmp.comm,
                newEmp.deptno
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

    static update = async (empno, emp, result) => {
        var connection;
        try {
            let dateEmp = emp.hiredate == undefined ? '02-JUN-21' : emp.hiredate;
            console.log(dateEmp)
            connection = await oracledb.getConnection(dbConn);
            let query = `
            update demo_ords.emp set 
            ename = :ename,
            job = :job,
            mgr = :mgr,
            hiredate = to_date(:hiredate, 'dd-mon-yy'),
            sal = :sal,
            comm = :comm,
            deptno = :deptno
            where empno = :empno`

            await connection.execute(query,
                [emp.ename,
                emp.job,
                emp.mgr,
                dateEmp,
                emp.sal,
                emp.comm,
                emp.deptno,
                empno],
                (err, res) => {
                    if (err) {
                        result(null, err);
                    } else {
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

    static deleteById = async (empno, result) => {
        var connection;
        try {
            connection = await oracledb.getConnection(dbConn);
            let query = `DELETE FROM demo_ords.emp WHERE empno = :empno`

            await connection.execute(query, [empno], (err, res) => {
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
}



module.exports = Emp;