const express = require('express');
const sql = require('mssql');
const  isAdministrator = require('../middleware/checkPermission');

const productRouter = express.Router();

productRouter.post('/new-product', isAdministrator, async (req, res) => {
    // FIXME: check admin 
    // admin sua truc tiep = db nen co the bo
    // ...
    try {
        const checkQuery = `
            SELECT * FROM Product
            WHERE ProductID = '${req.body.productID}'
        `;
        console.log(checkQuery)
        const checkResult = await new sql.Request().query(checkQuery);
        // if (checkResult.rowsAffected[0]) {
        //     res.json({
        //         success: false,
        //         message: "Duplicate ProductID"
        //     });
        // } else {
        const newQuery = `
                INSERT INTO Product
                VALUES (
                    '${req.body.productID}',
                    '${req.body.name}',
                    '${req.body.price}',
                    '${req.body.info}',
                    '${req.body.image}',
                    '${req.body.category}',
                    '${req.body.sold}'
                )
            `;
        const newResult = await new sql.Request().query(newQuery);
        res.status(201).json({ success: true });
        // }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

// FIXME: new new new
productRouter.post('/update', async (req, res)=> {
    
});

productRouter.get('/list', async (req, res) => {
    try {
        // console.log(req.query);
        const viewQuery = `
            SELECT * FROM Product
            ${req.query.keyword ? ("WHERE Name LIKE N'%" + req.query.keyword + "%'") : ''}
            ORDER BY ${req.query.sortField ? req.query.sortField : 'Sold'} ${req.query.sortDirection > 0 ? 'ASC' : 'DESC'}
            OFFSET ${(req.query.pageNumber - 1) * req.query.pageSize} ROWS  
            FETCH NEXT ${req.query.pageSize} ROWS ONLY
            `
        console.log(viewQuery);
        const viewResult = await new sql.Request().query(viewQuery);
        const total = await new sql.Request().query(
            `
            SELECT COUNT(*) AS Total FROM Product
            ${req.query.keyword ? ("WHERE Name LIKE '%" + req.query.keyword + "%'") : ''}
            `
        );
        // console.log(total);
        res.status(201).json({
            success: true,
            data: {
                total: total.recordset[0].Total,
                recordset: viewResult.recordset
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

productRouter.get('/best-seller', async (req, res) => {
    try {
        const result = await new sql.Request().query(`
            SELECT TOP 8 * FROM Product
            ${req.query.category ? ("WHERE Category LIKE 'N" + req.query.category + "'"):''}
            ORDER BY Sold DESC
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

productRouter.get('/:productID', async (req, res) => {
    try {
        const result = await new sql.Request().query(`
            SELECT * FROM Product
            WHERE ProductID = '${req.params.productID}'
        `);
        if (!result.rowsAffected[0]) {
            res.json({
                success: false,
                message: "ProductID not exist"
            });
        } else {
            res.status(201).json({
                success: true,
                data: result.recordset[0]
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

module.exports = productRouter;