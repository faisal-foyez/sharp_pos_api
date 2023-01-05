const mongoose = require('mongoose');
const commonProperties = require('../common.properties');

const Schema = mongoose.Schema;
const productSchema = new Schema({
    ...commonProperties,
    // sequence: {
    //     type: Number
    // },
    // image:{
    //     type: String,
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
    branch: {
        type: Schema.Types.ObjectId,
        ref: 'Branches'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'ProductCategories'
    },
    subCategory: {
        type: Schema.Types.ObjectId,
        ref: 'ProductSubCategories'
    },
    vatCategory: {
        type: Schema.Types.ObjectId,
        ref: 'VatCategories'
    },
    purchasePrice: {
        type: Number,
        default: null
    },
    salesPrice: {
        type: Number,
        default: null
    },
    commissionPerUnit:{
        type: Number,
        default: null
    },
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Suppliers'
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brands'
    },
    group:{
        type: Schema.Types.ObjectId,
        ref: 'Groups'
    },
    discountInPercentage:{
        type: Number,
        default: null
    },
    expiryDate:{
        type: Date,
        default: null
    },
    // isActive: {
    //     type: Boolean,
    //     default: true
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
productSchema.statics.findMaxSequence = function () {
    return this.findOne().select('sequence').sort({ sequence: -1 });
}
module.exports = mongoose.model('Products',productSchema);


