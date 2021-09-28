const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({
    path: "./config.env",
});
// Import middlewares
const debug = require("./middleware/debug");
// Import routers
const register = require("./router/register");

app.use(express.json());
app.use(debug);
app.use("/register", register);

// Starting server
app.listen(process.env.PORT, () => {
    console.log("Server started, listening on PORT", process.env.PORT);
});