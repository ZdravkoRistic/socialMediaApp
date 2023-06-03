const UserModel = require("../../models/userModel");
const {httpStatus} = require("../../config/constants");
const updateUser = (req, res) => {
    const currentUser = req.locals//user data from token - data from logged user
    const reqBody = req.body
    const {userId} = req.params
    const {role, email, createdAt, updatedAt, _id, ...updatedData} = reqBody

    if (currentUser.role === "admin") {
        updatedData.role = role
    } else if (userId !== currentUser._id && currentUser.role !== "admin") {
        return res.status(httpStatus.NOT_HAVE_PERMISSION.status)
            .send({error: "You dont have permission to change other user!"})
    }

    UserModel.findOneAndUpdate(
        {_id: userId},
        updatedData,
        {
            new: true,
            projection: {password: 0}
        })
        .then((result) => {
            console.log(result)
            res.send(result)
        })
        .catch((error) => {
            console.log(error)

        })

}

module.exports = updateUser
