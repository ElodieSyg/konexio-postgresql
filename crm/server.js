const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config({
    path: "./config.env",
});
// Import middlewares
const debug = require("./middleware/debug");
// Import routers
const register = require("./router/register");
const login = require("./router/login");

app.use(express.json());
app.use(cookieParser());
app.use(debug);
app.use("/register", register);
app.use("/login", login);

// Starting server
app.listen(process.env.PORT, () => {
    console.log("Server started, listening on PORT", process.env.PORT);
});