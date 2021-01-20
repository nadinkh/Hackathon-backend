const express = require('express');
const app = express();
const cors = require('cors');
const homeRouter = require('./routers/homeRouter');
const connectDB = require('./db/db');

const port = 5000;

// connect to mongo db project
connectDB();

app.use(cors());
app.use(express.json());

app.use(homeRouter);

app.listen(port, () => {
  console.log(`🟢 App listening at http://localhost:${port}`);
});
