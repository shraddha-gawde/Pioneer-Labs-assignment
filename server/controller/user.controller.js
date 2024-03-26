const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
require("dotenv").config()

const {userModel} = require('../models/user.model');
const { blacklistModel } = require("../models/blacklist.model");


const register = async(req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!/[A-Z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*()_+{}[;]/.test(password) || password.length < 8) {
            return res.status(400).json({ msg: "cannot register, password must contain atleast 1 character, one capital letter and minimul length 8" });
        }
        const existUser = await userModel.findOne({ email });
        if (existUser) {
            return res.status(400).json({ msg: "User Already Exists" });
        }
        bcrypt.hash(password, 10, async(err, hash) => {
            const user = new userModel({ username, email, password: hash });
            await user.save();
            res.status(200).json({ msg: "The new user has been registered", registeredUser: user });
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err });
    }
};


const login = async(req, res)=>{
    const { email, password, } = req.body
    try{
        const user = await userModel.findOne({email})
        const name = user.username
        console.log(user)
        if(user){
            bcrypt.compare(password, user.password, (err, result)=>{
                if(err){
                    res.status(200).json({msg:"user Does not exists!!!"})
                }
                if(result){
                    const secret_key = process.env.secretkey
                    const access_token = jwt.sign({ userID:user._id , username:user.username}, secret_key, {expiresIn : "7d"});
                    const refresh_token = jwt.sign({ userID:user._id , username:user.username}, secret_key,{ expiresIn : "14d"});

                    res.cookie("access_token", access_token, {httpOnly: true})
                    res.cookie("refresh_token", refresh_token, {httpOnly: true})

                    res.status(200).json({msg:"Login successful!", name, access_token, refresh_token})
                }
                else{
                    res.status(200).json({msg:"user Does not exists!!!"})
                }
            })
        }else{
            res.status(200).json({msg:"user Does not exists!!!"})
        }
    }catch(err){
        res.status(400).json({error:err})
    }
}


const resetPassword = async(req, res)=>{
    const userId = req.params.id
    const {currPassword, newPassword} = req.body

    try{
        const user = await userModel.findById(userId)
        if(!user){
            return res.status(200).json({msg: "User not found"})
        }
        const isValid = await bcrypt.compare(currPassword, user.password)
        if(!isValid){
            return res.status(200).json({msg: "Invalid current password"})
        }
        const hash = await bcrypt.hash(newPassword, 5)

        user.password = hash;
        await user.save();
        res.status(200).json({ msg: "Password reset successfully",user :user});
    }
    catch(err){
        res.status(500).json({ msg: "Error resetting password", error: err });
        console.log(err)
    }
}
const logout = async(req, res)=>{
    const access_token = req.cookies.access_token;
    const refresh_token = req.cookies.refresh_token;
  
    try {
      const blacklist = new blacklistModel({ access_token, refresh_token });
      await blacklist.save();
  
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");
  
      res.status(200).json({ msg: "User has been logged out" });
    } catch (err) {
      res.status(400).json({ error:err});
    }
}
module.exports={
    register,
    login,
    logout,
    resetPassword
}
