const UserModel = require("../../models/userModel");
const bcrypt = require("bcrypt")
const saltRounds = 10
const {httpStatus} = require("../../config/constants");

const register = async (req, res) => {
    const {email, password} = req.body
    const reqBody = req.body
    let isExist = await UserModel.count({email})

    if (isExist > 0) {
        res.status(httpStatus.EXIST.status)
            .send(httpStatus.EXIST.send)
    } else {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                console.log(err)
            }
            let newUser = new UserModel({...reqBody, password: hash})
            newUser.save()
                .then((user) => res.send(user))
                .catch((error) => {
                    res.status(httpStatus.SERVICE_ERROR.status)
                        .send(error.message)
                })
        })
    }
}

module.exports = register