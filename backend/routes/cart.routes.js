const express = require('express');
const sql = require('mssql');

const cartRouter = express.Router();

cartRouter.post('/add', async (req, res) => {
    try {
        const checkResult = await new sql.Request().query(`
            SELECT * FROM [Cart]
            WHERE ProductID = '${req.body.productID}' AND Username = '${req.body.username}'
        `);
        if (checkResult.rowsAffected[0]) {
            const result = await new sql.Request().query(`
                UPDATE [Cart]
                SET Quantity = Quantity + ${req.body.quantity}
                WHERE ProductID = '${req.body.productID}' AND Username = '${req.body.username}'
            `);
            res.status(201).json({ success: true });
        } else {
            const addQuery = `
                INSERT INTO [Cart]
                VALUES (
                    '${req.body.username}',
                    '${req.body.productID}',
                    '${req.body.quantity}'
                )
            `
            // console.log(addQuery);
            const result = await new sql.Request().query(addQuery);
            res.status(201).json({ success: true });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

cartRouter.delete('/delete', async (req, res) => {
    try {
        const result = await new sql.Request().query(`
            DELETE FROM [Cart]
            WHERE ProductID = '${req.body.productID}' AND Username = '${req.body.username}'
        `);
        res.status(201).json({ success: true });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

cartRouter.post('/update', async (req, res) => {
    try {
        const result = await new sql.Request().query(`
            UPDATE [Cart]
            SET Quantity = ${req.body.quantity}
            WHERE ProductID = '${req.body.productID}' AND Username = '${req.body.username}'
        `);
        res.status(201).json({ success: true });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

cartRouter.get('/:username', async (req, res) => {
    try {
        const result = await new sql.Request().query(`
            SELECT Cart.ProductID, Name, Image, Quantity, Price FROM [Cart]
            INNER JOIN [Product] ON Cart.ProductID = Product.ProductID
            WHERE Username = '${req.params.username}'
        `);
        res.status(201).json({
            success: true,
            data: result.recordset
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

});

module.exports = cartRouter;