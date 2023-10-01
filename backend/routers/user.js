const express = require("express")
const userRouter = express.Router()
const UserPost = require("../controllers/user")

userRouter.post("/", UserPost)

module.exports = userRouter