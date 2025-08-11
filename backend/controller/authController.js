import userModel from "../models/userModel.js"
import { comparePassword, hashPassword } from "../helper/authhelper.js"
import jwt from "jsonwebtoken"

const registerController = async (req, res) => {
    try {
        const { name, phoneNo, password } = req.body
        if (!name || !phoneNo || !password) {
            return res.status(500).send({
                message: "Please provide all feilds"
            })
        }
        const existingUser = await userModel.findOne({ phoneNo })
        if (existingUser) {
            return res.status(200).send({
                message: "Already registered please login"
            })
        }
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({ name, phoneNo, password: hashedPassword }).save();
        res.status(201).send({
            success: true,
            message: "user Registered Successfully",
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Error in registerAuthController",
            error
        })
    }

}

const loginController = async (req, res) => {
    try {
        console.log(req.body)
        const { phoneNo, password } = req.body 
        console.log(phoneNo)
        if(!phoneNo||!password){
            return res.send({
                success:false,
                message:"Please provide all Credentials"
            })
        }
        const user=await userModel.findOne({phoneNo})
        if(!user){
            return res.send({
                success:false,
                message:"Please Register yourself"
            })
        }
        const  hashedPassword=user.password
        const isSame=await comparePassword(password,hashedPassword)
        if(!isSame){
            return res.send({
                success:false,
                message:"Email or password is not correct"
            })
        }
        const token=jwt.sign({_id:user._id,email:user.email},process.env.JWT_SECRET_KEY,{expiresIn:'6h'});
        res.send({
            success:true,
            message:"Login successfull",
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in login Controller",
            error
        })
    }
}

export { registerController, loginController }