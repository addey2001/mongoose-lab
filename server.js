import 'dotenv/config'; // Load environment variables from .env file
import mongoose from 'mongoose';
import express from 'express';
import morgan from 'morgan';
import methodOverride from 'method-override';

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.urlencoded())
app.use(morgan('dev'))// Log HTTP requests
app.use(methodOverride('_method')) // Allow overriding HTTP methods

//model & schema
const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    director: { type: String, required: true },
    releaseYear:    { type: Number, required: true },
    genre: { type: String, required: true },
    rating: { type: Number, min: 0, max: 10, required: true },
})

const Movie = mongoose.model('Movie', movieSchema)


//index
app.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.render('movies/index.ejs', { allmovies:movies });
    } catch (error) {
        console.log( error)
    }})

    //new
app.get('/movies/new', (req, res) => {
    res.render('movies/new.ejs');
});


//ediitm(get)
app.get('/movies/:id/edit', async (req, res) => {
    const {movieId} = req.params;
    const movie = await Movie.findById(movieId);
    res.render('movies/edit.ejs', { movie });
});

//show 
app.get('/movies/:id', async (req, res) => {
   
    try {
       const {movieId} = req.params;
        const movie = await Movie.findById(movieId);
       
        res.render('movies/show.ejs', { movie });
    } catch (error) {
        console.log(error);
       }
});

//create
app.post('/movies', async (req, res) => {
    try {
        const newMovie = await Movie.create(req.body);
        res.redirect(`/movies/${newMovie._id}`);
    } catch (error) {
        console.log(error);
    }
});

//delete
app.delete('/movies/:id', async (req, res) => {
    try {
        const {movieId} = req.params 
        const deletedMovie = await Movie.findByIdAndDelete(movieId);
        return res.redirect('/movies');
    } catch (error) {
        console.log(error);

    }
})


//update
app.put('/movies/:movieId', async (req, res) => {
    try {
        const {movieId} = req.params;
        await Movie.findByIdAndUpdate(movieId, req.body);
        return res.redirect(`/movies/${movieId}`);
    } catch (error) {
        console.log(error);
    }
})


// home page 
app.get('/', (req, res) => {
    res.render('home.ejs');
});


mongoose.connect(process.env.MONGO_URI)


const init = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI) 
         console.log('Connected to MongoDB'); 
         app.listen(PORT, () => 
            console.log(`Server is running on port ${PORT}`));
        } catch(error) {
            console.log( error);
        }
    }

    init()
  


