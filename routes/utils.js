const requireUser = (req, res, next) => {
    try {
        if (req.user) {
            next();
        } else {
            res.sendStatus(409);
            next();
        }
    } catch (error) {
        next (error);
    };    
};

const requireAdmin = (req, res, next) => {
    try {
        const { isUser } = req.user;
        if (isUser) {
            next();
        } else {
            res.sendStatus(401);
            next();
        }
    } catch (error) {
        next (error);
    };    
};

module.exports = { requireAdmin, requireUser };