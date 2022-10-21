const Form = require('../models/form.js');


const createReservation = async (req,res)=>{
    const {date,name,phone,email,place} = req.body;

    try {
        let validation = await Form.findOne({ date });
        if (validation) {
            return res.status(400).json({
                succes: false,
                error: 'ya se reservo en dicha fecha'
            });
        }else{
            const newReservation = new Form({
                date,
                name,
                phone,
                email,
                place
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

module.exports= {
    createReservation,
    getReservation,
    getReservations,
    updateReservation,
    deleteReservation

}