const express = require("express")
const mongoose = require("mongoose")
const {DB_URL, PORT} = require("./config/config");
const server = express()

mongoose.connect(DB_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log(error))

server.use(express.json())

server.use("/api", require("./routes"))


server.listen(PORT, () => {
    console.log("Server running on http://localhost:4000")
})