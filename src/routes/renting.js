const {Router} = require('express');
const {createRenting, deleteRenting, updateRenting}=require('../controller/renting');

const router = Router();

router.post('/createRenting', createRenting);
router.put('/updateRenting/:id', updateRenting);
router.delete('/deleteRenting/:id', deleteRenting);




module.exports= router;