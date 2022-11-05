const {Router} = require('express');
const {createItem}=require('../controller/item');

const router = Router();

router.post('/createItem', createItem);

module.exports= router;