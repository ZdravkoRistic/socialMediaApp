const {httpStatus} = require("../../config/constants");
const LikeModel = require("../../models/likeModel");

const removeLike = (req, res) => {
    const {postId} = req.params
    const {_id} = req.locals

    LikeModel.deleteOne({$and: [{postId}, {userId: _id}]})
        .then((result) => {
            if (result.deletedCount === 1) {
                res.status(204).send("Like removed successfully")
            }
        })
        .catch((error) => {
            res
                .status(httpStatus.SERVICE_ERROR.status)
                .send(httpStatus.SERVICE_ERROR.send);
        });

}


module.exports = removeLike