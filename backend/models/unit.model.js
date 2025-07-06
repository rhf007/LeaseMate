const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pricePerMonth:{
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    isFurnished: {
        type: Boolean,
        required: true
    },
    numRooms: {
        type: Number,
        required: true
    },
    space: {
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    governorate: {
        type: String,
        required: true
    },
    postalCode: {
        type: Number
    },
})

module.exports = mongoose.model("Units", unitSchema)
//TODO: images, proprtyid, ownerid, amenities, status, available dates