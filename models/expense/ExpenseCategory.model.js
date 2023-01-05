const mongoose = require('mongoose');
const commonProperties = require('../common.properties');

const Schema = mongoose.Schema;
const expenseCategorySchema = new Schema({
    ...commonProperties,
    // sequence: {
    //     type: Number
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
expenseCategorySchema.statics.findMaxSequence = function () {
    return this.findOne().select('sequence').sort({ sequence: -1 });
}
module.exports = mongoose.model('ExpenseCategories',expenseCategorySchema);




