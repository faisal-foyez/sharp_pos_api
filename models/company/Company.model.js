const mongoose = require('mongoose');
const commonProperties = require('../common.properties');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    ...commonProperties,
    // sequence: {
    //     type: Number,
    //     default:null
    // },
    // code: {
    //     type: String,
    //     default: null
    // },
    name: {
        type: String,
        default: null
    },
    TIN: {
        type: String,
        default: null
    },
    vatRegNo: {
        type: String,
        default: null
    },
    fiscalYearStartDate: {
        type: Date,
        default: null
    },
    country: {
        type: String,
        default:'Bangladesh'
    },
    division: {
        type: String,
        default: null
    },
    district: {
        type: String,
        default: null
    },
    contactPerson: {
        type: String,
        default: null
    },
    address1:{
        type: String,
        default: null
    },
    address2: {
        type: String,
        default: null
    },
    phone1: {
        type: String,
        default: null
    },
    phone2: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    website: {
        type: String,
        default: null
    },
    // isActive: {
    //     type: String
    // },
    // comments: {
    //     type: String,
    //     default: null
    // },
    // createdBy: {
    //     type: String,
    //     default: null
    // },
    // createdDate: {
    //     type: Date,
    //     default: Date.now()
    // }

});


companySchema.statics.findMaxSequence = function(){
    return this.findOne().select('sequence').sort({sequence:-1});
}

//  RootModel.discriminator('Companies', companySchema)

module.exports   = mongoose.model('Companies', companySchema);


