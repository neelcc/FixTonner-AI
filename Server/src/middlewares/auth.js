import jwt from 'jsonwebtoken'

const userAuth = async (req,res,next) => {

    try {
        
        const { token } = req.headers
        console.log(token);
        console.log("worked");

        const verifYToken = await jwt.verify(token, process.env.JWT_SECRET) 
        if(!verifYToken){
             return res.status(401).json({ success: false, message: "No token provided"})
        }

        
        // const date = new Date();    

        const decoded = jwt.verify(token, process.env.JWT_SECRET, 
        //     function(err,decoded){
        //     if (err) {
        //         console.log(`${date.getHours()}:${date.getMinutes()}
        //                                        :${date.getSeconds()}`);
        //         console.log(err);
        //     }
        //     else {
        //         console.log(`${date.getHours()}:${date.getMinutes()}
        //                                        :${date.getSeconds()}`);
        //         console.log("Token verifified successfully");
        //     }
        // }
    );
        req.user = decoded;
        
        next()
    } catch (error) {
        console.error("Auth error:", error.message);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }


}

export default userAuth