module.exports = function isLoggedIn(req, res, next) {
    if (!req.session.currentUser) {
        return res.status(500).json({
            success: false,
            message: "Please login before doing this action"
        });
    }
    return next();
}

