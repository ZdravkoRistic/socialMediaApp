const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const {DB_URL, PORT, CORS_OPTIONS} = require("./config/config");
const server = express()

server.use(cors(CORS_OPTIONS))

mongoose.connect(DB_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log(error))

server.use(express.json())
server.get("/",(req, res)=>{
    res.send("Welcome to SELECTIT-SOCIAL - its work")
})
server.use("/api", require("./routes"))


server.listen(PORT, () => {
    console.log("Server running on http://localhost:4000")
})