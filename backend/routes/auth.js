const express = require("express")
const userController = require("../controller/UserController")
const Route = express.Router()

Route.post("/api/auth/register", userController.CreateUser)

Route.post("/api/auth/login" , userController.CreateLogin)



module.exports = Route
