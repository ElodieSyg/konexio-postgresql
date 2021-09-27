const express = require("express");
const { Pool } = require("pg");
const router = express.Router();

// Postgres connection
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

router.route("/")
    .get(async (req, res) => {
        let cities;
        try {
            cities = await Postgres.query("SELECT city FROM students");

            res.json({
                status: "Sucess",
                demand: "Ask all cities",
                data: cities.rows,
            });
        } catch (err) {
            res.status(400).json({
                message: "An error happened",
            });
        };
    });

router.route("/:city")
    .get(async (req, res) => {
        const cityParams = req.params.city;
        const city = cityParams.substring(0, 1).toUpperCase() + cityParams.substring(1).toLowerCase();

        console.log(city)
        let users;
        try {
            users = await Postgres.query("SELECT * FROM students WHERE city=$1", [city]);

            res.json({
                status: "Sucess",
                demand: `Students come from ${city}`,
                data: users.rows,
            });
        } catch (err) {
            res.status(400).json({
                message: "An error happened",
            });
        };
    });

module.exports = router;