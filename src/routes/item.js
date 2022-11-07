const {Router} = require('express');
const {createItem, listItem, deleteItem, updateItem}=require('../controller/item');

const router = Router();

router.post('/createItem', createItem);
router.get('/listItem',listItem);
router.delete('/deleteItem', deleteItem);
router.put('/updateItem',updateItem);

module.exports= router;