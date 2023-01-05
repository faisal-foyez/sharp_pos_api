const mongoose = require('mongoose');
const commonProperties = require('../common.properties');

const Schema = mongoose.Schema;
const salesSchema = new Schema({
    ...commonProperties,
    invoiceNo:{
        type:Number,
        default:null
    },
    saleDate:{
        type:Date,
        default:Date.now()
    },
    // sequence: {
    //     type: Number
    // },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branches'
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customers'
    },

    totalQuantity: {
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
    totalAmount: {
        type: Number,
        default: null
    },
    totalVat: {
        type: Number,
        default: null
    },
    netAmount: {
        type: Number,
        default: null
    },
    paidAmount: {
        type: Number,
        default: null
    },
    changeAmount: {
        type: Number,
        default: null
    },
    dueAmount: {
        type: Number,
        default: null
    },
    paymentType: {
        type: String,
        default: null
    },
    cardType: {
        type: String,
        default: null
    },
    cardNumber: {
        type: String,
        default: null
    },
    bankName: {
        type: String,
        default: null
    },
    chequeNo: {
        type: String,
        default: null
    },
    chequeDate: {
        type: Date,
        default: null
    },
    // comments: {
    //     type: String,
    //     default: null
    // },
    isVatApplicable:{
        type:Boolean,
        default:true
    }

});
salesSchema.statics.findMaxSequence = function () {
    return this.findOne().select('sequence').sort({ sequence: -1 });
}
module.exports = mongoose.model('Sales',salesSchema);


