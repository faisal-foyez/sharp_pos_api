const mongoose = require('mongoose');
const commonProperties = require('../common.properties');

const Schema = mongoose.Schema;
const expenseSubCategorySchema = new Schema({
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
        ref:'Branches'
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'ExpenseCategories'
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
expenseSubCategorySchema.statics.findMaxSequence = function () {
    return this.findOne().select('sequence').sort({ sequence: -1 });
}
module.exports = mongoose.model('ExpenseSubCategories',expenseSubCategorySchema);



