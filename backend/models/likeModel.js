const {Schema, model} = require("mongoose")

const LikeSchema = new Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    postId:{type:Schema.Types.ObjectId, required:true },
    userId:{type:Schema.Types.ObjectId, required:true },
    createdAt:{type: Date, default:()=> new Date().getTime()}
})

const LikeModel = model("likes",LikeSchema)
module.exports = LikeModel