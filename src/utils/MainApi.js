export const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};


export const response = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}


export const getSaveMovies = (jwt) => {
  return fetch(`http://localhost:3000/movies`, {
    method: 'GET',
    headers: {
      ...headers,
      'Authorization': `Bearer ${jwt}`,
    }
  }).then((res) => response(res));
};


export const deleteMovies = (movieId,jwt) => {
  return fetch(`http://localhost:3000/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Authorization': `Bearer ${jwt}`,
    }
  }).then((res) => response(res));
};

export const addMovie = (movie, jwt) => {

  console.log(movie);

  return fetch(`http://localhost:3000/movies`, {
    method: 'POST',
    headers: {
      ...headers,
      'Authorization': `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: 'https://api.nomoreparties.co' + movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: 'https://api.nomoreparties.co' + movie.image.formats.thumbnail.url,
      movieId: movie.id,
      nameRU: movie.nameRU || movie.nameEN,
      nameEN: movie.nameEN || movie.nameRU,
    }),
  }).then((res) => response(res));
};