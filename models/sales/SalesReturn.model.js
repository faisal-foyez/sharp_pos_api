const mongoose = require('mongoose');
const commonProperties = require('../common.properties');

const Schema = mongoose.Schema;
const salesReturnSchema = new Schema({
    ...commonProperties,
    sales: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sales'
    },
    returnDate: {
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    Note: {
        type: String,
        default: null
    },
    // comments: {
    //     type: String,
    //     default: null
    // }

});
salesReturnSchema.statics.findMaxSequence = function () {
    return this.findOne().select('sequence').sort({ sequence: -1 });
}
module.exports = mongoose.model('SalesReturns',salesReturnSchema);


