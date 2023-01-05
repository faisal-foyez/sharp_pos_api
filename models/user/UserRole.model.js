const mongoose = require('mongoose');
const commonProperties = require('../common.properties');

const Schema = mongoose.Schema;
const userRoleSchema = new Schema({
    ...commonProperties,
    // sequence: {
    //     type: Number
    // },
    // code: {
    //     type: String
    // },
    name: {
        type: String,
        default: null
    },
    branchId: {
        type: Number
    },
    isAdd: {
        type: Boolean,
        default: false
    },
    isEdit: {
        type: Boolean,
        default: false
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    isView: {
        type: Boolean,
        default: false
    },
    // isActive: {
    //     type: String
    // },
    // comments: {
    //     type: String
    // },
    // createdBy: {
    //     type: String
    // },
    // createdDate: {
    //     type: Date,
    //     default: Date.now()
    // }

});
userRoleSchema.statics.findMaxSequence = function () {
    return this.findOne().select('sequence').sort({ sequence: -1 });
}
module.exports = mongoose.model('UserRoles',userRoleSchema);


