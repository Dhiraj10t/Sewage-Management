import jwt from "jsonwebtoken";

const ensureAuthenticatedMiddleware=async(req,res,next)=>{
    try {
        console.log("header",req.headers["authorization"])
        const auth=req.headers["authorization"]
        const token=auth.split(" ")[1]
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user=decoded;
        next();
    } catch (error) {
        console.log(error)
        res.send({
            success:false,
            message:"Please login or Register"
        })
    }
}

export {ensureAuthenticatedMiddleware}