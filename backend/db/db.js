const mongoose = require("mongoose")
const connectwithDbs = require("./dbConnect")

const connected = (() => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    try {
        mongoose.connect(connectwithDbs, connectionParams)
        console.log("DBS connected successfully")
    }
    catch (error) {
        console.error(error)
        console.log("DBS could not connect")
    }
})

module.exports = connected

// second way to connect dbs is that 