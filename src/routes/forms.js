const {Router} = require('express');
const { getReservation, getReservations, createReservation, updateReservation, deleteReservation } = require('../controller/form');

const router = Router();

router.get('/all', getReservations );
router.get('/reservation/:reservationId',getReservation);
//agregar reserva
router.post('/create',createReservation);
router.put('/update/:reservationId',updateReservation);
router.delete('/delete/:reservationId',deleteReservation);

module.exports = router;