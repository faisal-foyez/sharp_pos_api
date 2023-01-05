const User = require('../../models/user/User.model');

exports.checkUser = async (username,password) =>{
    const user = await User.findOne({username,password})
    return user;

}