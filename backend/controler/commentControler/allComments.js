const CommentModel = require('../../models/commentModel');
const {httpStatus} = require("../../config/constants");

const allComments = async (req, res) => {
    const {postId} = req.params;
   
    let pipeline = [{$sort: {createdAt: -1}}];
    pipeline = [...pipeline,
        {$match:
                {$expr:
                        {
                            $eq:["$postId",{$toObjectId:postId}]
                        }
                }
        }
    ]

    CommentModel.aggregate([...pipeline])
        .then((comments) => {
            const count = comments.length;
            res.send({count, comments});
        })
        .catch((error) => {
            res.status(httpStatus.SERVICE_ERROR.status)
                .send({error: error.message})
        });
};

module.exports = allComments;
