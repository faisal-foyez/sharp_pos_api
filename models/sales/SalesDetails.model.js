const mongoose = require('mongoose');
const commonProperties = require('../common.properties');

const Schema = mongoose.Schema;
const salesDetailsSchema = new Schema({
    ...commonProperties,
    sales: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sales'
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
        type: Number,
        default: null
    },
    discountInPercentage: {
        type: Number,
        default: null
    },
    discountInAmount: {
        type: Number,
        default: null
    },
    vatAmount: {
        type: Number,
        default: null
    },
    totalAmount: {
        type: Number,
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
salesDetailsSchema.statics.findMaxSequence = function () {
    return this.findOne().select('sequence').sort({ sequence: -1 });
}
module.exports = mongoose.model('SalesDetails',salesDetailsSchema);




