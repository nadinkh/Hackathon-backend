const express = require('express');
const router = express.Router();

const Hospitals = require('../models/hospitals');

router.post('/newhospital', async (req, res) => {
  const { name, city, email, cell } = req.body;

  try {
    const hospitalEmail = await Hospitals.findOne({ email });
    const hospitalName = await Hospitals.findOne({ name });
    const hospitalCell = await Hospitals.findOne({ cell });

    if (hospitalEmail || hospitalName || hospitalCell) {
      if (hospitalEmail) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Email already exists' }] });
      }

      if (hospitalName) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Name already exists' }] });
      }

      return res.status(400).json({ errors: [{ msg: 'Phone alredy exists' }] });
    }

    newhospital = new Hospitals({
      name,
      city,
      email,
      cell,
    });

    await newhospital.save();

    return res.status(200).json({
      message: 'done!',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
