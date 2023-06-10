const {Schema, model} = require("mongoose")

const AdsSchema = new Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    image: {type: String, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    price: {type: Number, required: true},
    duration: {type: Number, required: true},
    userId: {type: Schema.Types.ObjectId, required: true},
})

const AdsModel = model("ads", AdsSchema)
module.exports = AdsModel