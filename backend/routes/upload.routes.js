const express = require('express');
const multer = require('multer');
const path = require('path');

const uploadRouter = express.Router();

const storage = multer.diskStorage({ //multers disk storage settings
    destination: './public/image/products',
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
});

const upload = multer({ //multer settings
    storage: storage,
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return cb(new Error('Only images are allowed'));
        }
        else return cb(null, true);
    },
    limits: {
        fileSize: 1024 * 1024 * 1024
    },
});

// upload.field for upload more fields
uploadRouter.post("/", upload.single('image'), async (req, res, err) => {
    console.log(req.file);
    // handle err ??? how 
    res.status(200).json({
        success: true,
        data: req.file.filename,
        session: req.session
    });
});

module.exports = uploadRouter;