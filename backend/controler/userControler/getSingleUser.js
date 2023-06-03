const UserModel = require("../../models/userModel");

const getSingleUser = (req, res) => {
  const userId = req.params.id;

  UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Server error" });
    });
};

module.exports = getSingleUser;

// const getSingleUser = async (req, res) => {
//     const userId = req.params.id;

//     try {
//       const user = await UserModel.findById(userId);

//       if (!user) {
//         return res.status(404).json({ error: "User not found" });
//       }

//       res.json(user);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Server error" });
//     }
//   };

//   module.exports = getSingleUser;
