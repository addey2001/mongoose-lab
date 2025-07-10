import 'dotenv/config'; // Load environment variables from .env file
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URI)


const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const Movie = mongoose.model('Movie', movieSchema)

//task 4
const movieSchema = new mongoose.Schema({
    title: 'the passion of the christ',
    director: 'Mel Gibson',
    releaseYear: 2004,
    genre: 'Drama',
    rating: 7.2



})
app.get('/', (req, res) => {
    res.send('Hello');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});