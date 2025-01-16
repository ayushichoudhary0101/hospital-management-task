const express = require('express');
const { bookAppointment, getAppointments,cancelAppointment  } = require('../Controllers/AppointmentController');
const router = express.Router();

router.post('/book', bookAppointment);
router.get('/appointments', getAppointments);

// router.delete('/appointments/:appointmentId', cancelAppointment);
module.exports = router;
