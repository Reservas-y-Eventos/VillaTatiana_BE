const {Router} = require('express');
const { getReservation, getReservations, createReservation, updateReservation, deleteReservation, getSites, getSite, } = require('../controller/form');

const router = Router();

router.get('/all', getReservations );
router.get('/reservation/:reservationId',getReservation);
//agregar reserva
router.post('/create',createReservation);
router.put('/update/:reservationId',updateReservation);
router.delete('/delete/:reservationId',deleteReservation);
//data DE LOS SITIOS
router.post('/sitios',getSites);
router.post('/sitio',getSite);


module.exports = router;