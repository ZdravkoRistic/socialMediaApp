const PostModel = require("../../models/postModel");
const {
    joinPostUser,
    joinCommentsPost,
    joinLikesPost,
} = require("../../stages/joins");
const {httpStatus} = require("../../config/constants");

const getSinglePost = (req, res) => {
    const {id} = req.params;

    let pipeline = [
        {
            $match: {
                $expr: {
                    $eq: ["$_id", {$toObjectId: id}],
                },
            },
        },
    ];

    PostModel.aggregate([
        ...pipeline,
        ...joinPostUser,
        ...joinCommentsPost,
        ...joinLikesPost,
    ])
        .then((post) => {
            if (post.length > 0) {
                res.send(post[0]);
            } else {
                res.status(httpStatus.NOT_EXIST.status)
                    .send(httpStatus.NOT_EXIST.send)
            }
        })
        .catch((error) => {
            res
                .status(401)
                .send({error: error.message});
        });
};

module.exports = getSinglePost;
