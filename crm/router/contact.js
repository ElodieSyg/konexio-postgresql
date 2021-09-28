const express = require("express");
const { Pool } = require("pg");
const router = express.Router();
// Import middlewares
const protect = require("../middleware/protect");

// Postgres connection
const Postgres = new Pool({
    ssl: { rejectUnauthorized: false },
});

// Routers
router.route("/")
    .get(async (_req, res) => {
        let contacts;
        try {
            contacts = await Postgres.query("SELECT * FROM contact");
            res.json({
                status: "Sucess",
                message: "Here is your contact list",
                data: contacts.rows,
            });
        } catch (err) {
            res.status(400).json({
                message: "An error happened",
            });
        };
    })
    .post(protect, async (req, res) => {
        const { name, email, description, category } = req.body;
        const contactCheck = await Postgres.query("SELECT * FROM contact WHERE name=$1 AND email=$2", [name, email]);

        const userId = req.cookies.jwtData.id;

        let contact;

        if (!contactCheck) {
            return res.status(400).json({
                message: "Contact already exist",
            });
        };

        try {
            contact = await Postgres.query("INSERT INTO contact(userId, name, email, description, category) VALUES ($1, $2, $3, $4, $5)",
                [userId, name, email, description, category]);

            res.json({
                status: "Sucess",
                message: "Contact created",
            });
        } catch (err) {
            console.log(err)
            res.status(400).json({
                message: "An error happened",
            });
        };
    });

module.exports = router;