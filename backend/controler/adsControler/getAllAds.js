const AdsModel = require("../../models/adsModel");
const {httpStatus} = require("../../config/constants");
const {joinPostUser} = require("../../stages/joins");
const moment= require("moment")
const getAllAds = (req, res) => {
    const currentDate = new Date(moment().format("YYYY-MM-DD"))
    AdsModel.aggregate([
        {$match: {endDate: {$gte: currentDate}}},
        {$match: {startDate: {$lte: currentDate}}},
        ...joinPostUser
    ])
        .then((ads) => {
            res.send(ads)
        })
        .catch((error) => {
            res.status(httpStatus.SERVICE_ERROR.status)
                .send({error: error.message})
        })
}

module.exports = getAllAds