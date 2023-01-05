const mongoose = require('mongoose');
const commonProperties = require('../common.properties');

const Schema = mongoose.Schema;
const purchaseReturnDetailsSchema = new Schema({
    ...commonProperties,
    purchaseReturn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PurchaseReturns'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    // sequence: {
    //     type: Number
    // },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branches'
    },
    buyQuantity: {
        type: Number,
        default: null
    },
    returnQuantity: {
        type: Number,
        default: null
    },
    returnUnitPrice: {
        type: String,
        default: null
    },
    returnReason: {
        type: String,
        default: null
    },
    productStatus:{
        type: String,
        default: null
    },
    // comments: {
    //     type: String,
    //     default: null
    // }


});
purchaseReturnDetailsSchema.statics.findMaxSequence = function () {
    return this.findOne().select('sequence').sort({ sequence: -1 });
}
module.exports = mongoose.model('PurchaseReturnDetails',purchaseReturnDetailsSchema);



