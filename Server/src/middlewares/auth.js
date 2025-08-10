import jwt from 'jsonwebtoken'

const userAuth = async (req,res,next) => {

    try {
        const { token } = req.headers
        
        const verifYToken = await jwt.verify(token, process.env.JWT_SECRET) 
        if(!verifYToken){
             return res.status(401).json({ success: false, message: "No token provided"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        
        next()
    } catch (error) {
        console.error("Auth error:", error.message);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }


}

export default userAuth