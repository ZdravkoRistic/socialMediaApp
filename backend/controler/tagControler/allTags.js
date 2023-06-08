const { httpStatus } = require("../../config/constants");
const TagModel = require("../../models/tagModel");

const allTags = (req, res) => {
  TagModel.aggregate([{ $project: { __v: 0 } }])
    .then((tags) => res.send(tags))
    .catch((error) => {
      console.log(error.message);
      res
        .status(httpStatus.SERVICE_ERROR.status)
        .send(httpStatus.SERVICE_ERROR.send);
    });
};

module.exports = allTags;
