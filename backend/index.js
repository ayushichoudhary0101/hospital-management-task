const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectDB = require('./Config/db')
const cors = require('cors');
const userRoutes = require("./Routes/AuthRouter");
require('dotenv').config();
connectDB();
const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors());
 
const authRouter = require('./Routes/AuthRouter');
const appointmentRoutes = require('./Routes/AppointmentRouter');

app.use('/api/auth', authRouter);
app.use('/api/appointments', appointmentRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})



