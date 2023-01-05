const commonProperties = {
    sequence:{
        type:Number
    },
    code: {
        type: String,
        default:null
    },
    image: {
        type: String,
        default: null
    },
    images: [String],
    isActive: {
        type: Boolean,
        default: true
    },
    comments: {
        type: String,
        default: null
    },
}

module.exports = commonProperties;