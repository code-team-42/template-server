module.exports = function(req, res, next) {
    if (
        (req.user &&
            (req.user.role === 'admin' || req.params.userId == req.user._id)) ||
        !req.params.userId
    ) {
        return next();
    }
    return res.redirect('/');
};
