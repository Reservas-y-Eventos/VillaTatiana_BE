const item = require('../models/item');

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
module.exports = {
    createItem
}