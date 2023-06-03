const PostModel = require("../../models/postModel");
const {httpStatus} = require("../../config/constants");

const deletePost = (req, res) => {
    const {id} = req.params//postId
    const user = req.locals
    let query = {_id: id}
    let isAdmin = user.role === "admin"

    if (!isAdmin) {
        query = {$and: [{_id: id}, {userId: user._id}]}
    }

    PostModel.deleteOne(query)
        .then((result) => {
            if (result.deletedCount === 1) {
                res.send({msg: "Post deleted"})
            } else {
                res.status(httpStatus.NOT_HAVE_PERMISSION.status)
                    .send({msg: "Post doesnt exist or you dont have permission to delete."})
            }
        })
        .catch((error) => {
            res.send({msg: "Error"})
        })


}

module.exports = deletePost
