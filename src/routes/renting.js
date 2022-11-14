const {Router} = require('express');
const {createRenting, deleteRenting, updateRenting, listRenting}=require('../controller/renting');

const router = Router();

router.post('/createRenting', createRenting);
router.put('/updateRenting/:id', updateRenting);
router.delete('/deleteRenting', deleteRenting);
router.get('/listRenting', listRenting);




module.exports= router;