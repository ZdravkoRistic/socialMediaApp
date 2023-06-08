const PostModel = require("../../models/postModel");
const {httpStatus} = require("../../config/constants");
const {joinPostUser, joinLikesPost} = require("../../stages/joins");
const searchPost = (req, res) => {
    const {q} = req.query
    if (q) {
        PostModel.aggregate([
            {
                $match: {
                    $or: [
                        {
                            title: {$regex: q, "$options": "i"},
                            body: {$regex: q, "$options": "i"},
                        }]
                }
            },
            {$sort: {createdAt: -1}},
            ...joinPostUser,
            ...joinLikesPost,
            {$project: {userId: 0}}
        ])
            .then((posts) => {
                res.send(posts)
            })
            .catch((error) => {
                res.status(httpStatus.SERVICE_ERROR.status)
                    .send({error: error.message})
            })
    } else {
        res.status(httpStatus.INVALID_DATA.status)
            .send(httpStatus.INVALID_DATA.send)
    }

}

module.exports = searchPost