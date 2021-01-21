const express = require('express');
const router = express.Router();

const { donorsAuth } = require('../middleware/auth');
const Appointments = require('../models/appointments');
const Users = require('../models/users');
const Hospitals = require('../models/hospitals');

router.post('/cancelappointment', donorsAuth, async (req, res) => {
  try {
    const userData = req.currentUser;
    const { hospitalId } = req.body;

    // get user and appointment ID
    const user = await Users.findById(userData.id);
    const appointmentId = user.appointments[0].appointments_id;

    // get hospital and delete appointment
    const hospital = await Hospitals.findById(hospitalId);

    hospital.appointmentsBooked = hospital.appointmentsBooked.filter(
      (appointment) => {
        return (
          JSON.stringify(appointment.appointments_id) !==
          JSON.stringify(appointmentId)
        );
      }
    );

    hospital.save();

    // get appointment and delete
    await Appointments.findOneAndDelete({
      _id: appointmentId,
    });

    // delete appointment
    user.appointments.pop();
    user.save();

    return res.status(200).json({
      msg: 'Appointment canceled successfully',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/newappointment', donorsAuth, async (req, res) => {
  try {
    const userData = req.currentUser;
    const { dateTime, hospitalId } = req.body;

    const newAppointment = new Appointments({
      dateTime,
      hospital_id: hospitalId,
      userData,
    });

    const user = await Users.findById(newAppointment.userData[0].id);

    if (user.appointments.length > 0) {
      return res
        .status(400)
        .json({ msg: 'Cannot schedule more than one appointment' });
    }

    const hospital = await Hospitals.findById(newAppointment.hospital_id);

    let findAppointment = null;

    await hospital.appointmentsBooked.find((appointment) => {
      if (appointment.dateTime === newAppointment.dateTime) {
        findAppointment = true;
        return true;
      }

      return null;
    });

    if (findAppointment) {
      return res
        .status(400)
        .json({ msg: 'Not availabul on this time and hour' });
    }

    newAppointment.save();

    user.appointments.push({
      appointments_id: newAppointment._id,
      dateTime: newAppointment.dateTime,
      hospital_id: newAppointment.hospital_id,
    });

    hospital.appointmentsBooked.push({
      appointments_id: newAppointment._id,
      dateTime: newAppointment.dateTime,
      userData: newAppointment.userData,
    });

    user.save();
    hospital.save();

    return res.status(200).json({
      newAppointment,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/appointment', donorsAuth, async (req, res) => {
  try {
    const { hospitalId } = req.body;

    const hospital = await Hospitals.findById(hospitalId);

    const appointments = await hospital.appointmentsBooked.find(
      (appointment) => {
        return appointment.dateTime > new Date().toLocaleString();
      }
    );

    return res.status(200).json({
      appointments,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
