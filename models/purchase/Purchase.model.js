const mongoose = require('mongoose');
const commonProperties = require('../common.properties');

const Schema = mongoose.Schema;
const purchaseSchema = new Schema({
    ...commonProperties,
    invoiceNo: {
        type: String,
        default:null
    },
    purchaseDate: {
        type: Date,
        default: Date.now()
    },
    // sequence: {
    //     type: Number
    // },
    branch: {
        type: Schema.Types.ObjectId,
        ref:'Branches'
    },
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Suppliers'
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Users'
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
    // }

});
purchaseSchema.statics.findMaxSequence = function () {
    return this.findOne().select('sequence').sort({ sequence: -1 });
}
module.exports = mongoose.model('Purchases',purchaseSchema);




