import jwt from "jsonwebtoken";

const ensureAuthenticatedMiddleware=async(req,res,next)=>{
    try {
        const auth=req.header["authorization"]
        const token=auth.split(" ")[1]
        const decoded=jwt.verify(token,JWT_SECRET_KEY)
        req.user=decoded;
    } catch (error) {
        console.log(error)
        res.send({
            success:false,
            message:"Please login or Register"
        })
    }
}

export {ensureAuthenticatedMiddleware}