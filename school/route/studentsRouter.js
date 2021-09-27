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
                demand: `Ask for the city about student ${id}`,
                data: user.rows,
            });
        } catch (err) {
            res.status(400).json({
                message: "An error happened",
            });
        };
    });

router.route("/:id/favorites")
    .get(async (req, res) => {
        const id = req.params.id;
        let user;
        try {
            user = await Postgres.query("SELECT class, sport FROM favorites WHERE id=$1", [id]);

            res.json({
                status: "Sucess",
                demand: `Ask for favorites about student ${id}`,
                data: user.rows,
            });
        } catch (err) {
            res.status(400).json({
                message: "An erro happened",
            });
        };
    });

router.route("/:id/class")
    .get(async (req, res) => {
        const id = req.params.id;
        let user;
        try {
            user = await Postgres.query("SELECT name, class FROM students INNER JOIN favorites ON students.id = favorites.student_id WHERE students.id = $1;", [id]);

            res.json({
                status: "Sucess",
                demand: `Ask for class about student ${id}`,
                data: user.rows,
            });
        } catch (err) {
            res.status(400).json({
                message: "An error happened",
            });
        };
    });

router.route("/:id/sport")
    .get(async (req, res) => {
        const id = req.params.id;
        let user;
        try {
            user = await Postgres.query("SELECT name, sport FROM students INNER JOIN favorites ON students.id = favorites.student_id WHERE students.id = $1;", [id]);

            res.json({
                status: "Sucess",
                demand: `Ask for informations and sport about student ${id}`,
                data: user.rows,
            });
        } catch (err) {
            res.status(400).json({
                message: "An error happened",
            });
        };
    });

router.route("/all/:class")
    .get(async (req, res) => {
        const classesParams = req.params.class;
        console.log(classesParams);
        const classes = classesParams.substring(0, 1).toUpperCase() + classesParams.substring(1).toLowerCase();
        console.log(classes)
        let users;
        try {
            users = await Postgres.query("SELECT * FROM students INNER JOIN favorites ON students.id = favorites.student_id WHERE favorites.class= $1;", [classes]);

            res.json({
                status: "Sucess",
                demand: `Students who like ${classes}`,
                data: users.rows,
            });
        } catch (err) {
            res.status(400).json({
                message: "An error happened",
            });
        };
    });

module.exports = router;