require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const connected = require("./db/db")
const userRouter = require("./routers/user")
const authRouter = require("./routers/auth")
// dbs connect 
connected()
// midllewares 
app.use(express.json())
app.use(cors())
// routes
app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)
// port
let port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server is running on ${port}`)
})