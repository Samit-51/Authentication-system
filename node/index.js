const express = require('express');
const mongoose = require('mongoose');
const AuthRoutes = require('./Routes/Authroutes');
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    app.listen(3000);
    console.log('Successfully connected to the database!');
  } catch (e) {
    console.log(e.message);
  }
};

connectDB();

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true 
}));
app.use(express.json())
app.use(AuthRoutes);
