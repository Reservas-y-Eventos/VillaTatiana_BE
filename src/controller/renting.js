const Renting = require('../models/renting')
const Item = require('../models/item');
const User = require('../models/user');

const createRenting = async (req, res) => {
    const {item,user,amount}= req.body;

    try{
        let findItem = await Item.findOne({_name:item});
        if(findItem){
            let findUser = await User.findOne({_cedula:user});
            if(findUser){
                let newRenting = await Renting.findOne({_user:user});
                if(newRenting){
                    return res.status(400).json({
                        succes: false,
                        error: 'El usuario ya hizo alquiler de este item, cancele el alquiler o modifique la cantidad si desea alquilar mas items de este tipo'
                    });

                }
                let stock1 = findItem.stock-amount;
                if(stock1<0){
                    return res.status(400).json({
                        succes: false,
                        message: 'No stock'
                    });

                }
                const itemUpdate = await Item.updateOne(
                    {_name:item},
                    {$set:{'stock':stock1}},
                );
                newRenting = new Renting (req.body);
                await newRenting.save();
                return res.status(200).json({
                    succes: true,
                    newRenting,
                    itemUpdate,
                    message: 'Alquiler realizado con exito'
                })


            }return res.status(400).json({
                succes: false,
                error:'El usuario no existe'

            })

        }return res.status(400).json({
            succes: false,
            error:'El item no existe'
        })

    }catch (error) {
        return res.status(500).json({
            succes:false,
            error: error.message
        });
    }

}

const updateRenting = async (req, res) => {
    const{id}=req.params;
    const{sum}= req.body;

    try{
        const findRenting = await Renting.findById({_id:id});
        if(findRenting){
            const findItem = await Item.findOne({_name:findRenting.item});
            let stock1= findItem.stock-sum;
            if(stock1<0){
                return res.status(400).json({
                    succes: false,
                    message: 'No stock'
                });
            }
            const updateItem = await Item.updateOne(
                {_name:findItem.name},
                {$set:{'stock':stock1}}

            )
            let amount1=findRenting.amount+sum;
            const RentingUpdate = await Renting.findByIdAndUpdate(
                {_id:id},
                {$set:{'amount':amount1}},
            );
            return res.status(200).json({
                succes:true,
                updateItem,
                RentingUpdate,
                message:'Alquiler modificado con exito'
            })
        }

    }catch (error) {
        return res.status(500).json({
            succes:false,
            error: error.message
        });
    }
}

const deleteRenting = async (req, res) => {
    const {id} = req.params;
    try{
        const deleteRenting = await Renting.findByIdAndDelete({_id:id});
        return res.status(200).json({
            succes:true,
            deleteRenting
        });


    }catch (error) {
        return res.status(500).json({
            succes:false,
            error: error.message
        });
    }
}

module.exports={
    createRenting,
    updateRenting,
    deleteRenting
}