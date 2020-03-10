const express = require('express');
const sql = require('mssql');
const bcryptjs = require('bcryptjs');
const isLoggedIn = require('../middleware/checkLogIn');

const customerRouter = express.Router();

customerRouter.post('/register', async (req, res) => {
    // validate email, password, fullname
    // ... may be not need
    console.log(req.body);
    try {
        const checkQuery = `
            SELECT * FROM Customer
            WHERE Username = '${req.body.username}'
        `;
        // console.log(checkQuery);
        const checkResult = await new sql.Request().query(checkQuery);
        // console.log(checkResult);
        if (checkResult.rowsAffected[0]) {
            res.status(400).json({
                success: false,
                message: "Username has been used"
            });
        } else {
            const hashPassword = bcryptjs.hashSync(req.body.password, 10);
            const regQuery = `
                INSERT INTO Customer
                VALUES (
                    '${req.body.username}',
                    '${hashPassword}',
                    N'${req.body.name}',
                    N'${req.body.address}',
                    '${req.body.phone}',
                    '0001'
                )
            `;
            console.log(regQuery);
            const regResult = await new sql.Request().query(regQuery);
            console.log(regResult)
            res.status(201).json({ success: true });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

customerRouter.post('/login', async (req, res) => {
    try {
        const checkQuery = `
            SELECT * FROM Customer
            WHERE Username = '${req.body.username}'
        `;
        // console.log(checkQuery);
        const checkResult = await new sql.Request().query(checkQuery);
        // console.log(checkResult);
        if (!checkResult.rowsAffected[0] || !bcryptjs.compareSync(req.body.password, checkResult.recordset[0].Password)) {
            res.status(400).json({
                success: false,
                message: "Incorrect Username or Password"
            });
        } else {
            req.session.currentUser = {
                username: req.body.username,
                permission: checkResult.recordset[0].Permission
            }
            res.status(200).json({
                success: true,
                message: "Login Success",
                username: req.body.username,
                permission: checkResult.recordset[0].Permission

            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

customerRouter.get('/logout', (req, res) => {
    req.session.destroy();
    res.send({ message: "Logout Success" });
})

customerRouter.get('/info/:username', async (req, res) => {
    try {
        const result = await new sql.Request().query(`
            SELECT Name, Address, Phone FROM Customer
            WHERE Username = '${req.params.username}'
        `);
        console.log(result)
        res.status(201).json({
            success: true,
            data: result.recordset[0]
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
})

module.exports = customerRouter;

