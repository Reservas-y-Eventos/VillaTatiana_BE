
const getUser =(req,res)=>{
    return res.status(200).json({
        succes:true,
        message:'ingreso'
    })
}

module.exports={
    getUser
}