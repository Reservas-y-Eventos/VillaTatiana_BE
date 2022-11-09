const {Router} = require('express');
const {createItem, listItem, deleteItem, updateItem, renting, rentingDelete}=require('../controller/item');

const router = Router();

router.post('/createItem', createItem);
router.get('/listItem',listItem);
router.delete('/deleteItem', deleteItem);
router.put('/updateItem',updateItem);
router.put('/renting/:id',renting);
router.put('/deleteRenting/:id',rentingDelete);


module.exports= router;