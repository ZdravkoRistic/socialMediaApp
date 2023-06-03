const jwt = require("jsonwebtoken")
const {JWT_KEY} = require("../config/config");
const UserModel = require("../models/userModel");
const {httpStatus} = require("../config/constants");

const verifyToken = (req, res, next) => {
    //1. provera da li postoji authorization property u req.headers
    if (req.headers.hasOwnProperty("authorization")) {
        let token = req.headers.authorization
        //2. provera validnosti tokena, da li je istekao i dekodiranje
        jwt.verify(token, JWT_KEY, async (error, decode) => {
            if (error) {
                //ako ima greske ili je token istekao
                res.status(httpStatus.TOKEN_EXPIRIES.status)
                    .send(httpStatus.TOKEN_EXPIRIES.send)
            } else {
                //ako je token validan
                try {
                    //provera da li postoji user sa id iz tokena kod nas u bazi
                    const user = await UserModel.findOne({_id: decode._id})
                    if (user) {
                        req.locals = {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            role: user.role,
                            _id: decode._id
                        }
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