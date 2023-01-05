const mongoose = require('mongoose');
const commonProperties = require('../common.properties');

const Schema = mongoose.Schema;
const expenseSchema = new Schema({
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
    category:{
        type: Schema.Types.ObjectId,
        ref: 'ExpenseCategories'
    },
    subCategory: {
        type: Schema.Types.ObjectId,
        ref: 'ExpenseSubCategories'
    },
    expenseDate:{
        type: Date,
        default: null
    },
    expenseAmount:{
        type: Number,
        default: null
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
expenseSchema.statics.findMaxSequence = function () {
    return this.findOne().select('sequence').sort({ sequence: -1 });
}

module.exports = mongoose.model('Expenses',expenseSchema);

