const jwt=require("jsonwebtoken");

const verifyToken=async (req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({ success: false, message: "access denied" });
    }
    try {
        const decodedToken= jwt.verify(token,process.env.JWT_SECRETKEY);
        req.id=decodedToken.id;
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

module.exports={verifyToken};