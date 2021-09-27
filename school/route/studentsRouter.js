const express = require("express");
const { Pool } = require("pg");
const router = express.Router();

// Postgre connection
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

router.route("/")
    .get(async (_req, res) => {
        let users;
        try {
            users = await Postgres.query("SELECT * FROM students");

            res.json({
                status: "Sucess",
                demand: "Ask for all students",
                data: users.rows,
            });
        } catch (err) {
            res.status(400).json({
                message: "An error happened",
            });
        };
    });

router.route("/:id")
    .get(async (req, res) => {
        const id = req.params.id;
        let user;
        try {
            user = await Postgres.query("SELECT * FROM students WHERE id=$1", [id]);

            res.json({
                status: "Sucess",
                demand: `Informations about student ${id}`,
                data: user.rows,
            });
        } catch (err) {
            res.status(400).json({
                message: "An error happened",
            });
        };
    });

router.route("/:id/city")
    .get(async (req, res) => {
        const id = req.params.id;
        let user;
        try {
            user = await Postgres.query("SELECT name, city FROM students WHERE id=$1", [id]);

            res.json({
                status: "Sucess",
                demand: `Ask for name and city about student ${id}`,
                data: user.rows,
            });
        } catch (err) {
            res.status(400).json({
                message: "An error happened",
            });
        };
    });

module.exports = router;