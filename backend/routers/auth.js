const express = require("express")
const authRouter = express.Router()
const Joi = require("joi")
const { User } = require("../models/user")
const bcrypt = require("bcrypt");

authRouter.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body)
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password", error: "email error" })
        }
        const validePassword = await bcrypt.compare(
            req.body.password, user.password
        )
        if (!validePassword) {
            return res.status(401).json({ message: "Invalid email or password", error: "password error" })
        }
        const token = user.generateAuthToken()
        res.status(200).json({ data: token, message: "Logged in successfully" })
    }
    catch (error) {
        return res.status(500).json({ message: error.message, error: "auth error" })
    }
})


const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    })
    return schema.validate(data)
}
module.exports = authRouter