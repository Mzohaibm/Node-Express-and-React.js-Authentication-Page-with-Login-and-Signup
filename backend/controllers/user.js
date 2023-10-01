const { validate, User } = require("../models/user");
const bcrypt = require("bcrypt");
// import userRouter from "../routers/user";
const UserPost = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(409).json({ message: "User with give email already exist" })
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashpassword = await bcrypt.hash(req.body.password, salt)
        await new User({
            ...req.body, password: hashpassword
        }).save()
        res.status(201).json({ message: "User created successfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message, error: " it is user error" })
    }
};

module.exports = UserPost