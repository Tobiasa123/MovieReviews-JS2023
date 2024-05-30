const express = require('express')
require('dotenv').config();
const mongoose = require('mongoose');


const app = express();
app.use(express.json());

//models
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

app.use(userRoutes);
app.use(movieRoutes);
app.use(reviewRoutes);

app.listen(process.env.PORT, () => {
    console.log(`server running at http://${process.env.URL}:${process.env.PORT}`)
})

mongoose.connect(process.env.MONGO_URL);
