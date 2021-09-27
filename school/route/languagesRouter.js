const express = require("express");
const { Pool } = require("pg");
const router = express.Router();

// Postgres connection
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

router.route("/")
    .get(async (_req, res) => {
        let languages;

        try {
            languages = await Postgres.query("SELECT * FROM languages;");

            res.json({
                status: "Sucess",
                demand: "Ask for all languages",
                data: languages.rows,
            });
        } catch (err) {
            res.status(400).json({
                message: "An error hapenned",
            });
        };
    });

router.route("/:id")
    .get(async (req, res) => {
        const id = req.params.id;
        let user;

        try {
            user = await Postgres.query("SELECT name, language FROM students WHERE id=$1", [id]); // Check query
            console.log(user.rows);

            res.json({
                status: "Sucess",
                demand: `Information about student ${id}`,
                data: user.rows,

            })
        } catch (err) {
            res.status(200).json({
                message: "An error hapenned",
            });
        };
    });

module.exports = router;
