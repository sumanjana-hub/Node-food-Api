const userModel = require('../models/userModel')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const registerController = async(req,res)=>{
      try {
        const {username,password,email,phone,address,answer} = req.body;

        if(!username|| !email || !phone || !address || !password || !answer) {
          return res.status(500).send({
            success: false,
            message:"Please provide all required information"
          })
        }
        const existinguser = await userModel.findOne({email})
        if(existinguser){
          return res.status(500).send({
            success: false,
            message:"email already registered please login"
          })
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedpassword = await bcrypt.hash(password,salt)

        const user = await userModel.create({
          username,
          email,
          password:hashedpassword,
          address,
          phone,
          answer
        })
        res.status(200).send({
          success: true,
          message:"sucessfully registered",
          user
        })
      } catch (error) {
        console.log(error);
        res.status(500).send({
               success:false,
               message:"Error",
               error
        })
      }
}

const loginController = async(req,res)=>{
     const {email,password} = req.body;

     if(!email || !password){
      return res.status(500).send({
        success: false,
        message:"Please provide email or password"
      })
     }
     const user = await userModel.findOne({email})
     if(!user){
      return res.status(404).send({
        success: false,
        message:"user not found"
      })
     }
     const isMatch = await bcrypt.compare(password, user.password)
     if(!isMatch){
      return res.status(500).send({
        success: false,
        message:"Inavalid credentials"
      })
     }
     const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
     return res.status(200).send({
      success: true,
      message:"login successful",
      token
     })
}

module.exports = {registerController,loginController}