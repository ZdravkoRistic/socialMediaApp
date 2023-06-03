const UserModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const { httpStatus } = require("../../config/constants");
const createToken = require("../../utils/jwt");

const login = (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email }, null, { lean: true })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            // delete user.password
            const { password, ...currentUser } = user;

            let token = createToken(
              {
                _id: currentUser._id,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                role: currentUser.role,
                time: new Date().getTime(),
              },
              "1d"
            );
            res.send({ user: currentUser, token });
          } else {
            res
              .status(httpStatus.INVALID_DATA.status)
              .send({ msg: "Password is not valid!" });
          }
        });
      } else {
        res.status(httpStatus.NOT_EXIST.status).send(httpStatus.NOT_EXIST.send);
      }
    })
    .catch((error) => {
      console.log("ERROR", error);
      res
        .status(httpStatus.SERVICE_ERROR.status)
        .send(httpStatus.SERVICE_ERROR.send);
    });
};

module.exports = login;
