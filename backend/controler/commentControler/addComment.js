const {httpStatus} = require("../../config/constants");
const commentModel = require("../../models/commentModel");

const addComment = (req, res) => {
    let userFromToken = req.locals;

    let {_id, firstName, lastName} = userFromToken;

    let comment = {
        ...req.body,
        user: {
            id: _id,
            firstName,
            lastName,
        },
    };
    let newComment = new commentModel(comment);
    newComment.save()
        .then((newComment) => {
            res.status(200).send({newComment});
        })
        .catch((error) => {
            res
                .status(httpStatus.SERVICE_ERROR.status)
                .send(httpStatus.SERVICE_ERROR.send);

        });
};

module.exports = addComment;
