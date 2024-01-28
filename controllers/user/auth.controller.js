const express = require('express');
const Jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {getByQuery} = require('../../services/user/user.service');
const router = express.Router();

//SIGN IN ROUTE 
router.post('/signin',async (req,res)=>{
    const {username,password} = req.body;
    console.log(username,password);

    const users = await getByQuery({username:username});
    const user = users[0];
    if(!user) return res.status(400).send('Username or password is wrong')

    const validPass = await bcrypt.compare(password , user.password);
    if (!validPass) return res.status(400).send('Username or password is wrong')

    const token = Jwt.sign({userId:user._id,branch:user.branchId,username:user.username},process.env.TOKEN_SECRET);
    res.status(200).header('auth-token',token).send(token);
})

module.exports = router; 