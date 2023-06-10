const AdsModel = require("../../models/adsModel");
const {httpStatus} = require("../../config/constants");
const moment = require("moment/moment");
const AddAds = async (req, res) => {
    const {_id: userId} = req.locals
    let {startDate, endDate,...reqBody} = req.body
    startDate = new Date(moment(startDate).format("YYYY-MM-DD"))
    endDate =new Date(moment(endDate).format("YYYY-MM-DD"))

    try {
        const newAds = new AdsModel({...reqBody,startDate,endDate, userId})
        const saveAds = await newAds.save()
        if (saveAds) {
            res.send(saveAds)
        } else {
            res.status(httpStatus.SERVICE_ERROR.status).send({error: "Ads is not saved to database."})
        }
    } catch (error) {
        res.status(httpStatus.SERVICE_ERROR.status).send({error: error.message})
    }
    
}

module.exports = AddAds