const Renting = require('../models/renting')
const Item = require('../models/item');
const User = require('../models/user');

const createRenting = async (req, res) => {
    const {name,dni,amount}= req.body;

    try{
        let findItem = await Item.findOne({name});
        if(findItem){
            let findUser = await User.findOne({dni});
            if(findUser){
                let newRenting = await Renting.findOne({dni});
                if(newRenting && newRenting.name==name){
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
                    {name},
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
            let name= findRenting.name;
            const findItem = await Item.findOne({name});
            let stock1= findItem.stock-sum;
            if(stock1<0){
                return res.status(400).json({
                    succes: false,
                    message: 'No stock'
                });
            }
            const updateItem = await Item.updateOne(
                {name},
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
        let name= deleteRenting.name;
        let amount= deleteRenting.amount;
        const findItem = await Item.findOne({name});
        let stock1 = findItem.stock+amount;
        const itemUpdate = await Item.updateOne(
            {name},
            {$set:{'stock':stock1}},
        );
        return res.status(200).json({
            succes:true,
            deleteRenting,
            itemUpdate,
            message:'Renta eliminada con exito'
        });


    }catch (error) {
        return res.status(500).json({
            succes:false,
            error: error.message
        });
    }
}

const listRenting = async (req, res) => {
    const {name}=req.params;
    try {
        const info =[];
        const rents = await Renting.find({name});
        for (let i = 0; i < rents.length; i++ ){
            let dni = rents[i].dni;
            const findUser = await User.findOne({dni});
            info.push(findUser);
        }
        return res.status(200).json({
            succes:true,
            rents,
            info
        })

        
    } catch (error) {
        return res.status(500).json({
            succes:false,
            error: error.message
        });
    }
}

module.exports={
    createRenting,
    updateRenting,
    deleteRenting,
    listRenting
}