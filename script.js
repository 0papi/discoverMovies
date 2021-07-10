const search = document.getElementById('search');
const main = document.querySelector('.main');
const form = document.querySelector('.form');

// obtain APIs for popular movies 
const POPULAR_MOVIES_API_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=11155205ddfd642006e9438183cf059b'

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=11155205ddfd642006e9438183cf059b&query="'

const IMG_API = 'https://image.tmdb.org/t/p/w1280'

const MOVIE_LINK = 'https://www.themoviedb.org/'



fetchPopularMovies(POPULAR_MOVIES_API_URL);

async function fetchPopularMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results); 
}

function showMovies(movies) {
  main.innerHTML = '';
  movies.forEach((movie) => {
    const {title, vote_average, original_language, poster_path, overview} = movie;

    const divElement = document.createElement('div');
    divElement.className = 'movie';
    divElement.innerHTML = `
      <div class="movie">
        <img src="${IMG_API + poster_path}" alt="${title}">
        <div class="movie-info">
          <h3 class="movie-title">${title}</h3>
          <p class="lang">${original_language}</p>
          <span class="${getMovieRating(vote_average)}">${vote_average}</span>
        </div>
        <div class="bottom">
          <pclass="overview">${overview}</p>
          <a href="${MOVIE_LINK}" target = "_blank "class="btn">Check Out Movie</a>
        </div>
      </div>
    `
    main.appendChild(divElement);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value; 

  if(searchTerm && searchTerm !== '') {
    fetchPopularMovies(SEARCH_API + searchTerm);
    search.value = '';
  } else {
    window.location.reload();
  }

});

function getMovieRating(vote) {
  if(vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return 'orange'
  } else {
    return 'red'
  }

}

