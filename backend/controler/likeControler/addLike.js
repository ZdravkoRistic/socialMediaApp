const LikeModel = require("../../models/likeModel");
const addLike = async (req, res, next) => {
    const currentUser = req.locals
    const {postId} = req.params
//    proveriti da li je post lajkovan
    let isLiked = LikeModel.count({$and: [{postId: postId}, {userId: currentUser._id}]})
    if (isLiked > 0) {
        //ako je lajkovan izvrsava se sledeci middleware removeLike
        next()
    } else {

    }
}

module.exports = addLike