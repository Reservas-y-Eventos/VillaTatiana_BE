const {response} = require('express');
const jwt = require('jsonwebtoken');


const validator=(req,res= response,next) =>{
    const token = req.header('x-token');

    if (!token) {
        return res.status(500).json({
            success:false,
            message: 'no existe token en el encabezado'
        });
    }
    try {
        //'DAN-AUD-ALE'
        // process.env.SECRET_JWT
        const {id,dni,name,lastName,phone,email,userName,firstLogin,state} = jwt.verify(
            token,
            process.env.SECRET_JWT
        );
        req.id =id,
        req.dni = dni,
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
            message:'el token no es válido'
        });
    }
    next();
}


module.exports={
    validator,
    
}