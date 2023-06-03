const CommentModel = require("../../models/commentModel");
const {joinPostComment} = require("../../stages/joins");
const {httpStatus} = require("../../config/constants");

const getComment = (req, res) => {
    const id = req.params.id

    CommentModel.findOne({_id: id})
        .then((comments) => {
            res.send({comments})
        })
        .catch((error) => {
            res.status(httpStatus.SERVICE_ERROR.status)
                .send({error:error.message})

        })
    //
    // CommentModel.aggregate([
    //     {$match: {$expr:{$eq:["$_id",{$toObjectId:id}]}}},
    //     ...joinPostComment])
    //       .then((comments) => {
    //           res.send(comments)
    //       })
    //       .catch((error) => {
    //           console.log(error)
    //       })
}

module.exports = getComment