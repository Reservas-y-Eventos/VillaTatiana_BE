const Form = require('../models/form.js');
const Sites = require('../models/sites.js');

//CREAR RESERVACION EN EL CALENDARIO
const createReservation = async (req,res)=>{
    const {date,name,phone,email,service} = req.body;
    const valido = true;

    try {
        let validation = await Form.find({ date });
        if(validation.length>=1){
        if(validation[0].service == "Finca"){
            return res.status(400).json({
                succes: false,
                error: 'ya se reservo toda la finca, no puede reservar un sitio'
            });
        }else if(validation[0].service != "Finca" && service=="Finca"){
            return res.status(400).json({
                succes: false,
                error: 'no puede reservar la finca, ya se reservo un sitio menor'
            });
        }else{
            for (var i = 0; i < validation.length; i++) {
                if(validation[i].service == service){
                    valido == false
                        return res.status(400).json({
                            succes: false,
                            error: 'ya se reservo en la fecha: '+ date + ' ,el servicio: '+ service
                        });
                    }
                }
                if(valido == true){
                    const newReservation = new Form({
                        date,
                        name,
                        phone,
                        email,
                        service
                    });
                    newReservation.save();
                    return res.status(200).json({
                        succes:true,
                        newReservation
                    }); 
                }  
        }
                     
            }else if (validation.length==0){
                const newReservation = new Form({
                    date,
                    name,
                    phone,
                    email,
                    service
                });
                newReservation.save();
                return res.status(200).json({
                    succes:true,
                    newReservation
                });
            }

          
          
    } catch (error) {
        return res.status(500).json({
            succes:false,
            error: error.message
        });
        
    }
}

//BUSCAR RESERVACION EN EL CALENDARIO POR ID
const getReservation = async(req,res)=>{
    const {reservationId} = req.params;
    try {
        const reservation = await Form.findById({_id:reservationId});
        return res.status(200).json({
            succes:true,
            reservation
        })
    } catch (error) {
        return res.status(500).json({
            succes:false,
            error: error.message
        });
    }

}


//BUSCAR TODAS LAS RESERVACIONES
const getReservations =async(req,res)=>{
    try {
        const reservation = await Form.find();
        return res.status(200).json({
            succes:true,
            reservation
        })
    } catch (error) {
        return res.status(500).json({
            succes:false,
            error: error.message
        });
    }
    
}

//ACTUALIZAR DATOS DE UNA RESERVACION EN EL CALENDARIO
const updateReservation = async(req,res) =>{
    const {reservationId} = req.params;
    try {
        const reservationUpdate = await Form.findByIdAndUpdate(
            {_id:reservationId},
            req.body,
            {
                new:true,
            }
            );
            return res.status(200).json({
                succes:true,
                reservationUpdate
            });
    } catch (error) {
        return res.status(500).json({
            succes:false,
            error: error.message
        });
        
    }
    
}

//ELIMINAR RESERVACION EN EL CALENDARIO
const deleteReservation = async(req,res)=>{
    const {reservationId} = req.params;
    console.log(reservationId);
    try {
        const variable = await Form.findByIdAndDelete({_id:reservationId});
        return res.status(200).json({
        succes:true,
        variable
    });
    } catch (error) {
        return res.status(500).json({
            succes:false,
            error: error.message
        });
    }
}

//TRAER TODOS LOS SITIOS A RESERVAR EN EL CALENDARIO
const getSites = async(req,res)=>{
    const {name} = req.body;
    try {
        const reservation = await Sites.find({ name });
        

        return res.status(200).json({
            succes:true,
            reservation
        })
    } catch (error) {
        return res.status(500).json({
            succes:false,
            error: error.message
        });
    }

}
//TRAER UN TIPO DE SITIO A RESERVAR EN EL CALENDARIO
const getSite = async(req,res)=>{
    const {type} = req.body;
    try {
        const reservation = await Sites.findOne({ type });
        return res.status(200).json({
            succes:true,
            reservation
        })
    } catch (error) {
        return res.status(500).json({
            succes:false,
            error: error.message
        });
    }

}



module.exports= {
    createReservation,
    getReservation,
    getReservations,
    updateReservation,
    deleteReservation,
    getSites,
    getSite,


}