// app.js
// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const movieList = require('./movies.json')
const app = express()
const port = 3000


// setting template engine
app.engine('handlebars' , exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

// setting static files
  app.use(express.static('public'))
// routes setting
app.get('/', (req, res) => {

  // past the movie data into 'index' partial template
  res.render('index', { movies: movieList.results})
})
app.get('/movies/:id', (req, res) => {
  const movie = movieList.results.find(movie => movie.id === +req.params.id)
  // past the movie data into 'index' partial template
  //{movie} equals {movie : movie}
  res.render('show', {movie})
})
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const movies = movieList.results.filter(movie => movie.title.toLowerCase().includes(keyword))
  // past the movie data into 'index' partial template
  res.render('search', {movies, keyword})
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on  http://localhost:${port}`)
})