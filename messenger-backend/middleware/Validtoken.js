const jwt = require("jsonwebtoken");

const validToken = async(req,res,next) => {
    const authheader = req.headers.authorization;
    if(!authheader || ! authheader.startsWith("Bearer ")){
        return res.status(401).json({message:"no token provided"})
    }
    const token = authheader.split(" ")[1];
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decode) => {
        if(err){
            return res.status(401).json({message:"invalid authorization"})
        }
        req.user = decode.user;
        next();
    })
}

module.exports = validToken;