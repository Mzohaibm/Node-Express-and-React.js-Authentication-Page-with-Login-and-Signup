require("dotenv").config()
const mongoose = require("mongoose");
const joi = require("joi")
const jwt = require("jsonwebtoken")
const passwordComplexity = require("joi-password-complexity");
const userSchema = new mongoose.Schema(
    {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
    {
        collection: "users",
    }
);

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.PRIVATEKEY,
        {
            expiresIn: "7d",
        }
    );
    return token;
};

const User = mongoose.model("user", userSchema);
// console.log(mongoose, " it is manogse methods");

// validation function for user data
const validate = (data) => {
    const schema = joi.object({
        firstname: joi.string().required().label("First Name"),
        lastname: joi.string().required().label("Last Name"),
        email: joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
    })
    // Validate the data against the defined schema
    return schema.validate(data)
}
module.exports = { User, validate };
