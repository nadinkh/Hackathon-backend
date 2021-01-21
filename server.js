const express = require('express');
const app = express();
const cors = require('cors');
const homeRouter = require('./routers/homeRouter');
const usersRouter = require('./routers/usersRouter');
const signup = require('./routers/signupRouter');
const login = require('./routers/loginRouter');
const createHospitals = require('./routers/createHospitals');
const appointmentRouter = require('./routers/appointmentRouter');
const connectDB = require('./db/db');
const hospitalRouter = require('./routers/hospitalRouter');

const port = process.env.PORT || 5000;

// connect to mongo db project
connectDB();

app.use(cors());
app.use(express.json());

app.use(homeRouter);
app.use(usersRouter);
app.use(signup);
app.use(login);
app.use(createHospitals);
app.use(appointmentRouter);
app.use(hospitalRouter);

app.listen(port, () => {
  console.log(`🟢 App listening at http://localhost:${port}`);
});
