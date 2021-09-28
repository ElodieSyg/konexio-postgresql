const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({
    path: "./config.env",
});
// Import routers
const register = require("./router/register");

app.use(express.json());
app.use("/register", register);

// Starting server
app.listen(process.env.PORT, () => {
    console.log("Server started, listening on PORT", process.env.PORT);
});