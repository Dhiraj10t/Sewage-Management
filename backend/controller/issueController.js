import issuemodel from "../models/issueModel.js";
import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import userModel from "../models/userModel.js";


const postcontroller = async (req, res) => {
    try {
        console.log(req.body)
        const { location, adress, type, date, description } = req.body
        const locationObj = typeof location === "string" ? JSON.parse(location) : location;
        console.log("location", location);
        console.log("req.file 👉", req.file);
        console.log("req.body 👉", req.body);

        if (!location || !adress) {
            return res.send({
                success: false,
                message: "Please provide location or address"
            })
        }
        if ( !type || !date) {
            return res.send({
                success: false,
                message: "provide all credentials(Photo,Problem,Date)"
            })
        }
        console.log(req.user)
        const imageUpload = await cloudinary.uploader.upload(req.file.path, {
            folder: "sewage-chember"
        })
        fs.unlinkSync(req.file.path);
        const photoUrl = imageUpload.secure_url;
        const publicId = imageUpload.public_id;
        console.log(photoUrl)
        // const photoUrl=photo

        const issue = await issuemodel({
            longitude: locationObj.lng,
            latitude: locationObj.lat,
            photo:photoUrl,
            adress,
            type,
            date,
            description,
            status: "pending",
            solvedPhoto: "",
            userId: req.user._id
        }).save()
        res.send({
            success: true,
            message: "Issue registered successully",
            issue
        })
    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "error in postController"
        })
    }
}

const getcontroller = async (req, res) => {
    try {
        const issues = await issuemodel.find({}).populate("userId")
        if (issues.length == 0) {
            return res.send({
                success: false,
                message: "No Issues Posted",
            })
        }
        res.send({
            success: true,
            message: "issues fetched successfully",
            issues
        })
    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "error in getcontroller"
        })
    }
}


const getsinglecontroller = async (req, res) => {
    try {
        console.log(req.user)
        const userId=req.user._id;
        const issues = await issuemodel.find({userId}).populate("userId")
        if (issues.length == 0) {
            return res.send({
                success: false,
                message: "No Issues Posted",
            })
        }
        res.send({
            success: true,
            message: "issues fetched successfully",
            issues
        })
    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "error in getcontroller"
        })
    }
}


const updateController = async (req, res) => {
    try {
        const { status, id } = req.body
        if (!status) {
            return res.send({
                success: false,
                message: "Please provide all credentials"
            })
        }
        const result = await issuemodel.updateOne({ _id: id }, { $set: { status: status } })
        res.send({
            success: true,
            message: "updated successfully",
            result
        })
    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "error in updatecontroller"
        })
    }
}

const deleteController = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            return res.send({
                success: false,
                message: "Please provide credentials"
            })
        }
        const result = await issuemodel.deleteOne({ _id: id })
        res.send({
            success: true,
            message: "Deleted successfully",
            result
        })
    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "error in deleteController"
        })
    }
}

const getusercontroller = async (req, res) => {
    try {
        console.log(req.user)
        const id=req.user._id;
        const user = await userModel.find({_id:id})
        
        res.send({
            success: true,
            message: "user fetched successfully",
            user
        })
    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "error in getcontroller"
        })
    }
}

export { getcontroller, postcontroller, updateController, deleteController, getsinglecontroller, getusercontroller }