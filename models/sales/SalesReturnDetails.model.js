const mongoose = require('mongoose');
const commonProperties = require('../common.properties');

const Schema = mongoose.Schema;
const salesDetailsSchema = new Schema({
    ...commonProperties,
    salesReturn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SalesReturns'
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
    soldQuantity: {
        type: Number,
        default: null
    },
    returnQuantity: {
        type: Number,
        default: null
    },
    // stockQuantity: {
    //     type: String
    // },
    returnReason: {
        type: mongoose.Schema.Types.ObjectId
    },
    productReturnCondition: {
        type: mongoose.Schema.Types.ObjectId
    },

    // comments: {
    //     type: String,
    //     default: null
    // }
});
salesDetailsSchema.statics.findMaxSequence = function () {
    return this.findOne().select('sequence').sort({ sequence: -1 });
}
module.exports = mongoose.model('SalesReturnDetails',salesDetailsSchema);



