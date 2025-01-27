const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next)=>{
    const token = req.header('Authorization')?.split(' ')[1];

    if(!token){
        return res.status(401).json({message:'Access denied. No token provided.'});
    }
    console.log(token, 'token')
    try{
        const decoded = jwt.verify(token, "process.env.JWT_SECRET");
        console.log('decoded', decoded)
        req.user = decoded;
        next();
    }catch(error){
        res.status(400).json({message: "Invalid token."});
    }
}

module.exports = verifyToken;