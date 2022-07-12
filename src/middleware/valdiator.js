const {response} = require('express');
const jwt = require('jsonwebtoken');


const validator=(req,res= response,next) =>{
    const token = req.header('x-token');

    if (!token) {
        return res.status(500).json({
            success:false,
            message: 'dont exists token in header '
        });
    }
    try {
        const {id,name,lastName,phone,email,userName,firstLogin,state} = jwt.verify(
            token,
            process.env.SECRET_JWT
        );
        req.id =id,
        req.name=name,
        req.lastName = lastName,
        req.phone = phone,
        req.email =email,
        req.userName = userName,
        req.firstLogin =firstLogin,
        req.state =state;
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:'the token is invalid'
        });
    }
    next();
}


module.exports={
    validator,
    
}