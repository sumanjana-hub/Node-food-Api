const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs")

const getuserController = async(req,res)=>{
    try {
        const user = await userModel.findById({_id: req.body.id})
        if(!user){
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }
        res.status(200).send({
            success: true,
            message:"get successfully",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:"error in get api"
        })
    }

}

const updateUserController = async(req,res) =>{
    try {
        const user = await userModel.findById({_id:req.body.id})
        if(!user){
            return res.status(404).send({
                success: false,
                message:"user not found"
            })
        }
        const {username,phone,address,password} = req.body
        if(username) user.username = username
        if(phone) user.phone = phone
        if(address) user.address = address
        if(password) user.password = password

        await user.save()
        res.status(200).send({
            success: true,
            message:"Update successful"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in update",
            error
        })
    }
}

const resetPasswordController = async(req,res) =>{
        try {
            const {email,newpassword,answer} = req.body
        if(!email || !newpassword || !answer){
            return res.status(500).send({
                success: false,
                message:"Please provide all fields"
            })
        }
        const user = await userModel.findOne({email,answer})
        if(!user){
            return res.status(500).send({
                success: false,
                message:"user not found or invalid answer"
            })
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newpassword, salt);
        user.password = hashedPassword
        await user.save();
        res.status(200).send({
            success: true,
            message:"Password reset successfully"
        })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message:"error in reset password"
            })
        }
}

const updatePasswordController = async(req,res)=>{
       try {
          const user = await userModel.findById({_id:req.body.id})
          if(!user){
            return res.status(404).send({
                success: false,
                message:"user not found"
            })
          }
          const {oldpassword,newpassword} = req.body
          if(!oldpassword || !newpassword){
            return res.status(500).send({
                success: false,
                message:"please provide old or new password"
            })
          }
          const isMatch = await bcrypt.compare(oldpassword, user.password)
          if(!isMatch){
           return res.status(500).send({
             success: false,
             message:"Inavalid old password"
           })
          }
          const salt = bcrypt.genSaltSync(10);
          const hashedPassword = await bcrypt.hash(newpassword, salt);
          user.password = hashedPassword
          await user.save()
          res.status(200).send({
            success: true,
            message:"password updated"
          })
       } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:"error in update password"
        })
       }
}

const deleteUserController = async(req,res )=>{
             try {
                await userModel.findByIdAndDelete(req.params.id)
                res.status(200).send({
                    success: true,
                    message:"deleted successfully"
                  })
             } catch (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message:"error in delete api"
                })
             }
}
module.exports = {getuserController,updateUserController,resetPasswordController,updatePasswordController,deleteUserController}