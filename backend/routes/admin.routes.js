const express = require('express');
const sql = require('mssql');

const adminRouter = express.Router();

adminRouter.get('/count', async (req, res) => {
    try {
        const result = await new sql.Request().query(`
            SELECT COUNT(*) AS NumberOfProducts, SUM(Sold) AS Sold
            FROM [Product]
            SELECT COUNT(*) AS NumberOfCustomers
            FROM [Customer]
            SELECT COUNT(*) AS NumberOfOrders, SUM(Total) AS Total
            FROM [Order]
        `);
        res.status(201).json({
            success: true,
            products: result.recordsets[0][0].NumberOfProducts,
            sold: result.recordsets[0][0].Sold,
            users: result.recordsets[1][0].NumberOfCustomers,
            orders: result.recordsets[2][0].NumberOfOrders,
            total: result.recordsets[2][0].Total
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

adminRouter.get('/recent-orders', async (req, res) => {
    try {
        const result = await new sql.Request().query(`
            SELECT TOP 5 * FROM [Order]
            ORDER BY CreateDate DESC
        `);
        res.status(201).json({
            success: true,
            recordset: result.recordset
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

module.exports = adminRouter;