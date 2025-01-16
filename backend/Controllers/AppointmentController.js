const Appointment = require('../Models/Appointment');

exports.bookAppointment = async (req, res) => {
  const { doctorId, patientId, date } = req.body;
  try {
    const appointment = await Appointment.create({ doctorId, patientId, date });
    res.status(201).json({ message: 'Appointment booked', appointment });
  } catch (error) {
    res.status(400).json({ message: 'Error booking appointment', error });
  }
};



// exports.cancelAppointment = async (req, res) => {
//   const { appointmentId } = req.params; // Get appointmentId from URL params

//   try {
//     // Find the appointment by its ID and delete it
//     const appointment = await Appointment.findByIdAndDelete(appointmentId);

//     if (!appointment) {
//       return res.status(404).json({ message: 'Appointment not found' });
//     }

//     res.status(200).json({ message: 'Appointment canceled', appointment });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('doctorId').populate('patientId');
    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

