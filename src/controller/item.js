const item = require('../models/item');
const userId = require('../models/user');

//LLENAR INVENTARIO
const createItem= async (req,res)=>{
    const {name, time, price, type, stock}= req.body;
    
    try{
        let newItem = await item.findOne({name});
        if(newItem){
            return res.status(400).json({
                succes: false,
                error: 'The item was already created'
            });
        }
        newItem = new item (req.body);
        await newItem.save();
        return res.status(200).json({
            succes:true,
            newItem,
            message: 'The item was created successfully'
        });

    }catch (error) {
        return res.status(500).json({
            succes:false,
            error: error.message
        });

    }
    

}

const listItem = async (req, res) => {
    try {
        const items = await item.find();
        return res.status(200).json({
            succes:true,
            items
        })
    } catch (error) {
        return res.status(500).json({
            succes:false,
            error: error.message
        });
    }
}


const deleteItem= async (req, res) => {
    const {name} = req.params;
    try{
        const deleteItem = await item.findOneAndDelete({_name:name});
        return res.status(200).json({
            succes:true,
            deleteItem
        });


    }catch (error) {
        return res.status(500).json({
            succes:false,
            error: error.message
        });
    }
}

const updateItem = async (req, res) => {
    const {name, time, price, type, stock} = req.body;
    try {
        let find = await item.findOne({name});
        if(find){
            const itemUpdate = await item.findOneAndUpdate(
                {name},
                req.body,
                {
                    new:true,
                }
                );
                return res.status(200).json({
                    succes:true,
                    itemUpdate
                });
        }
        return res.status(400).json({
            succes: false,
            error:'The item dont exists'
        })

        

    } catch (error) {
        return res.status(500).json({
            succes:false,
            error: error.message
        });
        
    }
}
module.exports = {
    createItem,
    listItem,
    deleteItem,
    updateItem
}