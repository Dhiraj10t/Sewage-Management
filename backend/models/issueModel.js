import mongoose from "mongoose";

const issueSchema=new mongoose.Schema({
    photo:{
        type:String
    },
    adress:{
        type:String
    },
    latitude:{
        type:String
    },
    longitude:{
        type:String
    },
    type:{
        type:String,
    },
    date:{
        type:String
    },
    description:{
        type:String
    },
    status:{
        type:String,
    },
    solvedPhoto:{
        type:String,
    },
    userId:{
        type:String
    }
},{timestamps:true});

const issuemodel=new mongoose.model("issue",issueSchema)

export default issuemodel