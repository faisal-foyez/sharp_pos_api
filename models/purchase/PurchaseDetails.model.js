const mongoose = require('mongoose');
const commonProperties = require('../common.properties');

const Schema = mongoose.Schema;
const purchaseDetailsSchema = new Schema({
    ...commonProperties,
    purchase: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Purchases'
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
    quantity: {
        type: Number,
        default: null
    },
    unit: {
        type: String,
        default: null
    },
    // stockQuantity: {
    //     type: String
    // },
    unitPrice: {
        type: String,
        default: null
    },
    discountInPercentage: {
        type: String,
        default: null
    },
    discountInAmount: {
        type: String,
        default: null
    },
    totalAmount: {
        type: String,
        default: null
    },

    // comments: {
    //     type: String,
    //     default: null
    // },
    isVatApplicable: {
        type: Boolean,
        default: true
    }

});
purchaseDetailsSchema.statics.findMaxSequence = function () {
    return this.findOne().select('sequence').sort({ sequence: -1 });
}
module.exports = mongoose.model('PurchaseDetails',purchaseDetailsSchema);




