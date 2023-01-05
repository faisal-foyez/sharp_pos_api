const mongoose = require('mongoose');
const commonProperties = require('../common.properties');

const Schema = mongoose.Schema;
const customerSchema = new Schema({
    ...commonProperties,
    // sequence:{
    //     type:Number
    // },
    // code:{
    //     type: String,
    //     default: null
    // },
    name:{
        type: String,
        default: null
    },
    discountRate:{
        type: Number,
        default: null
    },
    branchId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branches'
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomerCategories'
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomerSubCategories'
    },
    address1: {
        type: String,
        default: null
    },
    address2: {
        type: String,
        default: null
    },
    country: {
        type: String,
        default: null
    },
    division: {
        type: String,
        default: null
    },
    district: {
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
    // isActive: {
    //     type: Boolean,
    //     default: false
    // },
    // comments: {
    //     type: String,
    //     default: null
    // },
    // createdBy:{
    //     type: String,
    //     default: null
    // },
    // createdDate:{
    //     type:Date,
    //     default:Date.now()
    // }

});
customerSchema.statics.findMaxSequence = function () {
    return this.findOne().select('sequence').sort({ sequence: -1 });
}
module.exports = mongoose.model('Customers',customerSchema);
    
    
    