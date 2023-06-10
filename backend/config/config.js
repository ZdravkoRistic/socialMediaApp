require("dotenv").config()
const whiteList = ["http://localhost:63342", "http://localhost:5501"]
module.exports = {
    JWT_KEY: process.env.JWT_KEY,
    DB_URL: process.env.DB_URL,
    PORT: process.env.PORT,
    STRIPE_SK:process.env.STRIPE_SK,
    CORS_OPTIONS: {
        origin: (origin, cb) => {
            if (whiteList.includes(origin)) {
                // cb(null, true)
            } else {
                // cb(new Error("Not allowed by CORS"))
            }
            cb(null, true)
        }
    }
}