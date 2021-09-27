const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({
    path: "./config.env",
});
// Import middlewares
const debug = require("./middleware/debug");
// Import routers
const studentsRouter = require("./route/studentsRouter");
const languagesRouter = require("./route/languagesRouter");

// Middlewares
app.use(express.json());
app.use(debug);
app.use("/students", studentsRouter);
app.use("/languages", languagesRouter);

// Starting server
app.listen(process.env.PORT, () => {
    console.log("Server started, listening on PORT", process.env.PORT);
});