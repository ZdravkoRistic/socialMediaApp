const {Schema, model} = require("mongoose")

const TagSchema = new Schema({
    name: {type: String, required: true},
})

const TagModel = model("tags", TagSchema)
module.exports = TagModel