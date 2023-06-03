const {Schema, model} = require("mongoose");
const MessageSchema = new Schema({
    senderId: {type: Schema.Types.ObjectId, required: true},
    recivedId: {type: Schema.Types.ObjectId, required: true},
    createdAt: {type: Date, default: () => new Date().getTime()},
    message: {type: String, required: true},
    viewAt: {type: Date, default: null}
})

const MessageModel = model("messages", MessageSchema)
module.exports = MessageModel