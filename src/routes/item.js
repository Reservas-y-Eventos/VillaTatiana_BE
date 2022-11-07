const {Router} = require('express');
const {createItem, listItem}=require('../controller/item');

const router = Router();

router.post('/createItem', createItem);
router.get('/listItem',listItem);

module.exports= router;