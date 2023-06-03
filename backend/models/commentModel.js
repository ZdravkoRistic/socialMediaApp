const {Schema, model} = require("mongoose")

const CommentSchema = new Schema({
    body: {type: String, required: true},
    postId: {type: Schema.Types.ObjectId, required: true},
    user: {
        id: {type: Schema.Types.ObjectId, required: true},
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
    },
    createdAt: {type: Date, default: () => new Date().getTime()},
    updatedAt: {type: Date, default: null},
})

const CommentModel = model("comments", CommentSchema)
module.exports = CommentModel;


