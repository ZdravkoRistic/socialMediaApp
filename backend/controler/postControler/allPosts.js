const PostModel = require("../../models/postModel");
const {joinPostUser} = require("../../stages/joins");

const allPosts = async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : null
    const page = req.query.page ? (parseInt(req.query.page) - 1) * limit : null
    const isPublic = req.query.public ? parseInt(req.query.public) : null

    let count = 0
    let pipeline = [{$sort: {createdAt: -1}}]

    if (isPublic !== null) {
        pipeline = [...pipeline, {$match: {isPublic: !!isPublic}}]
        count = await PostModel.count({isPublic: !!isPublic})
    } else {
        count = await PostModel.count({})
    }

    if (limit !== null && page !== null) {
        pipeline = [...pipeline, {$skip: page},
            {$limit: limit}]
    }

    PostModel.aggregate([...pipeline, ...joinPostUser])
        .then((posts) => {
            res.send({posts, count})
        })
        .catch((error) => {
            console.log(error)
        })
}


module.exports = allPosts