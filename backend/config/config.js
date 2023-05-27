require("dotenv").config()
module.exports = {
    JWT_KEY: process.env.JWT_KEY,
    DB_URL: process.env.DB_URL,
    PORT: process.env.PORT
}