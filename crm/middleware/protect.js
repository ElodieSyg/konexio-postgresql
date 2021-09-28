const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    try {
        const data = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        req.cookies.jwtData = data;
        next();
    } catch (err) {
        return res.status(400).json({
            message: "Your token is not valid",
        });
    };
};

module.exports = protect;