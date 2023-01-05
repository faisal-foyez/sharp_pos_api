const mongoose = require('mongoose');
const commonProperties = require('../common.properties');

const Schema = mongoose.Schema;
const branchSchema = new Schema({
    ...commonProperties,
    // sequence: {
    //     type: Number
    // },
    // code: {
    //     type: String,
    //     default:null
    // },
    name: {
        type: String,
        default: null
    },
    vatRegNo: {
        type: String,
        default: null
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Companies'
    },
    country: {
        type: String,
        default: 'Bangladesh'
    },
    division: {
        type: String,
        default: null
    },
    district:{
        type: String,
        default: null
    },
    contactPerson: {
        type: String,
        default: null
    },
    address1: {
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
    //     type: String,
    //     default: false
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
branchSchema.statics.findMaxSequence = function () {
    return this.findOne().select('sequence').sort({ sequence: -1 });
}
module.exports = mongoose.model('Branches',branchSchema);