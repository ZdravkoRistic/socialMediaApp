const PostModel = require("../../models/postModel");

const deletePost = (req, res) => {

    const {id} = req.params
    const user = req.locals
    let query = {_id: id}

    let isAdmin = user.role === "admin"

    if (!isAdmin) {
        query = {$and: [
                {_id: id},
                {userId: user._id}
            ]}
    }

    PostModel.deleteOne(query)
        .then((result) => {
            if (result.deletedCount === 1) {
                console.log(result)
                res.send({msg: "Post deleted"})
            } else {
                console.log(result)
                res.send({msg: "Problem with deletion post"})
            }
        })
        .catch((error) => {
            res.send({msg: "Error"})
        })




}

module.exports = deletePost
