const mongoose = require('mongoose');
const commonProperties = require('../common.properties');

const Schema = mongoose.Schema;
const productSubCategorySchema = new Schema({
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
    category:{
        type: Schema.Types.ObjectId,
        ref: 'ProductCategories'
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
productSubCategorySchema.statics.findMaxSequence = function () {
    return this.findOne().select('sequence').sort({ sequence: -1 });
}
module.exports = mongoose.model('ProductSubCategories',productSubCategorySchema);


