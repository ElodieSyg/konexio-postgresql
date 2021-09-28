const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
const router = express.Router();

// Postgres connection
const Postgres = new Pool({
    ssl: { rejectUnauthorized: false },
});

// Routers
router.route("/")
    .post(async (req, res) => {
        const { email, password } = req.body;
        let user = await Postgres.query("SELECT * FROM users WHERE email=$1", [email]);

        if (!user.rows[0].email) {
            return res.status(401).json({
                message: "User don't exist",
            });
        };

        const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Unauthorized, invalid email or password",
            });
        };

        const token = jwt.sign({ id: user.rows.id }, process.env.JWT_SECRET);

        res.cookie("jwt", token, { httpOnly: true, secure: false });

        res.json({
            status: "Sucess",
            message: "Here is you token for subsequent requests",
        });
    });

module.exports = router;