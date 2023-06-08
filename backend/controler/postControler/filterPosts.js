const PostModel = require("../../models/postModel");

const filterPosts = (req, res) => {
  const { tags } = req.query;

  PostModel.aggregate([
    {
      $match: {
        "tags.name": tags,
      },
    },
  ])
    .then((post) => {
      res.send(post);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = filterPosts;
