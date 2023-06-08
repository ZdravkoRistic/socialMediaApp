const {httpStatus} = require("../../config/constants");
const PostModel = require("../../models/postModel");

const addPost = (req, res) => {
    const userFromToken = req.locals;

    const {_id: userId} = userFromToken;

    const post = {
        ...req.body, userId
    }

    const addPost = new PostModel(post);
    addPost.save()
        .then((addPost) => {
            res.status(200).send(addPost);
        })
        .catch((error) => {
            res
                .status(httpStatus.SERVICE_ERROR.status)
                .send(httpStatus.SERVICE_ERROR.send);

        });

}
module.exports = addPost;