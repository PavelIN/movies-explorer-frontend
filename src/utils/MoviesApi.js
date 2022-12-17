
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

export const getMovies = () => {
    return fetch(`https://api.nomoreparties.co/beatfilm-movies`, {
      headers,
    })
      .then(res => response(res));
  };

