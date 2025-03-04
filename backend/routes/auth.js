const express = require("express")
const userController = require("../controller/UserController")
const Route = express.Router()

Route.post("/api/auth/register" , userController.CreateUser)


module.exports = Route
