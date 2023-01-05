const mongoose = require('mongoose');
const commonProperties = require('../common.properties');

const Schema = mongoose.Schema;
const purchaseReturnSchema = new Schema({
    ...commonProperties,
    purchase: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Purchases'
    },
    purchaseDate: {
        type: Date,
        default: Date.now()
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branches'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    Note: {
        type: String,
        default: null
    },

});
purchaseReturnSchema.statics.findMaxSequence = function () {
    return this.findOne().select('sequence').sort({ sequence: -1 });
}
module.exports = mongoose.model('PurchaseReturns',purchaseReturnSchema);



