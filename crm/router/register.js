const { application } = require("express");
const express = require("express");
const { Pool } = require("pg");
const router = express.Router();

// Postgres connection
const Postgres = new Pool({
    ssl: { rejectUnauthorized: false },
});

// Routers
router.route("/")
    .get(async (req, res) => {
        let users;
        try {
            users = await Postgres.query("SELECT * FROM users");

            res.json({
                status: "Sucess",
                message: "Users list",
                data: users.rows,
            });
        } catch (err) {
            res.status(400).json({
                message: "An error happened",
            });
        };
    })
    .post(async (req, res) => {
        const email = req.body.email;
        console.log(email);
        const password = req.body.password;
        console.log(password);
        let user;
        try {
            user = await Postgres.query("INSERT INTO users(email, password) VALUES ($1, $2)", [email, password]);
            console.log(user.rows);

            res.json({
                status: "Sucess",
                message: "User created",
                data: user.rows,
            });
        } catch (err) {
            console.log(err);
            res.status(400).json({
                message: "An error happened",
            });
        };
    })

router.route("/:id")
    .delete(async (req, res) => {
        const id = req.params.id;
        let user;
        try {
            user = await Postgres.query("DELETE FROM users WHERE id=$1", [id]);

            res.json({
                status: "Sucess",
                message: "User deleted",
            });
        } catch (err) {
            res.status(400).json({
                message: "An error happened",
            });
        };
    });

module.exports = router;