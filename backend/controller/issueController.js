import issuemodel from "../models/issueModel.js";

const postcontroller=async(req,res)=>{
    try {
        console.log(req.body)
        const {location,photo,adress,type,date,description}=req.body
        if(!location||!adress){
            return res.send({
                success:false,
                message:"Please provide location or address"
            })
        }
        if(!photo||!type||!date){
            return res.send({
                success:false,
                message:"provide all credentials(Photo,Problem,Date)"
            })
        }
        const issue=await issuemodel({longitude:location.lng,latitude:location.lat,photo,adress,type,date,description,status:"pending",solvedPhoto:"",usrId:""}).save()
        res.send({
            success:true,
            message:"Issue registered successully",
            issue
        })
    } catch (error) {
        console.log(error)
        res.send({
            success:false,
            message:"error in postController"
        })
    }
}

const getcontroller=async(req,res)=>{
    try {
        const issues=await issuemodel.find({})
        if(issues.length==0){
            return res.send({
                success:false,
                message:"No Issues Posted",
            })
        }
        res.send({
            success:true,
            message:"issues fetched successfully",
            issues
        })
    } catch (error) {
        console.log(error)
        res.send({
            success:false,
            message:"error in getcontroller"
        })
    }
}

const updateController=async(req,res)=>{
    try {
        const {status,id}=req.body
        if(!status){
            return res.send({
                success:false,
                message:"Please provide all credentials"
            })
        }
        const result=await issuemodel.updateOne({_id:id},{$set:{status:status}})
        res.send({
            success:true,
            message:"updated successfully",
            result
        })
    } catch (error) {
        console.log(error)
        res.send({
            success:false,
            message:"error in updatecontroller"
        })
    }
}

const deleteController=async(req,res)=>{
    try {
        const {id}=req.body
        if(!id){
            return res.send({
                success:false,
                message:"Please provide credentials"
            })
        }
        const result =await issuemodel.deleteOne({_id:id})
        res.send({
            success:true,
            message:"Deleted successfully",
            result
        })
    } catch (error) {
        console.log(error)
        res.send({
            success:false,
            message:"error in deleteController"
        })
    }
}

export {getcontroller,postcontroller,updateController,deleteController}