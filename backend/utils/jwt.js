const jwt = require("jsonwebtoken")
const {JWT_KEY} = require("../config/config");
const createToken = (payload, expiresIn) => {
    return jwt.sign(payload, JWT_KEY, {expiresIn})
}

module.exports = createToken