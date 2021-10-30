const requireUser = (req, res, next) => {
    try {
        if (req.user) {
            next();
        } else {
            res.sendStatus(401);
            next();
        };
    } catch (error) {
        next (error);
    };    
};

const requireAdmin = (req, res, next) => {
    try {
        const { isAdmin } = req.user;
        if (isAdmin) {
            next();
        } else {
            res.sendStatus(401);
            next();
        };
    } catch (error) {
        next (error);
    };    
};

module.exports = { requireAdmin, requireUser };