const {Router} = require('express');
const {createRenting, deleteRenting, updateRenting, listRenting}=require('../controller/renting');

const router = Router();

router.post('/createRenting', createRenting);
router.put('/updateRenting/:id', updateRenting);
router.delete('/deleteRenting/:id', deleteRenting);
router.get('/listRenting/:name', listRenting);




module.exports= router;