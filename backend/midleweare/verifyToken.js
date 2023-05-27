const jwt = require("jsonwebtoken")
const {JWT_KEY} = require("../config/config");
const UserModel = require("../models/userModel");
const {httpStatus} = require("../config/constants");

const verifyToken = (req, res, next) => {
    if (req.headers.hasOwnProperty("authorization")) {
        let token = req.headers.authorization
        jwt.verify(token, JWT_KEY, async (error, decode) => {
            if (error) {
                res.status(httpStatus.TOKEN_EXPIRIES.status)
                    .send(httpStatus.TOKEN_EXPIRIES.send)
            } else {
                try {
                    const user = await UserModel.findOne({_id: decode._id})
                    if (user) {
                        next()
                    } else {
                        res.status(httpStatus.TOKEN_EXPIRIES.status).send({msg: "Token is invalid."})
                    }
                } catch (error) {
                    res.status(httpStatus.SERVICE_ERROR.status)
                        .send(httpStatus.SERVICE_ERROR.send)
                }
            }
        })
    } else {
        res.status(httpStatus.TOKEN_EXPIRIES.status).send({msg: "You not logged"})
    }
}

module.exports = verifyToken