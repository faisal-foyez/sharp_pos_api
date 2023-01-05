const mongoose = require('mongoose');
const commonProperties = require('../common.properties');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    ...commonProperties,
    // sequence: {
    //     type: Number
    // },
    // code: {
    //     type: String
    // },
    firstName: {
        type: String,
        default:null
    },
    lastName: {
        type: String,
        default: null
    },
    name:{
        type:String,
        default:function(){
            return this.firstName + " " + this.lastName
        }
    },
    username:{
        type: String,
        default: null
    },
    password:{
        type: String,
        default: null
    },
    branch: {
        type: Number,
        ref:'Branches'
    },
    presentAddress: {
        type: String,
        default: null
    },
    permanentAddress: {
        type: String,
        default: null
    },
    gender:{
        type: String,
        default: null
    },
    phone1:{
        type: String,
        default: null
    },
    phone2:{
        type: String,
        default: null
    },
    email:{
        type: String,
        default: null
    },
    isVerified:{
        type:Boolean
    },
    verificationCode:{
        type:String
    },
    userRoleId:{
        type:Number
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
userSchema.statics.findMaxSequence = function () {
    return this.findOne().select('sequence').sort({ sequence: -1 });
}
module.exports = mongoose.model('Users',userSchema);