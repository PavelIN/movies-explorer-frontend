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

  export const creatUser = ({ name, password, email }) => {
    return fetch(`http://localhost:3000/signup`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: name,
        password: password,
        email: email,
      }),
    }).then((res) => response(res));
  };
  
  
  
  export const updateUser = ({ name,  email },jwt) => {
    return fetch(`http://localhost:3000/users/me`, {
      method: 'PATCH',
      headers: {
        ...headers,
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then((res) => response(res));
  };
  
  
  export const login = ({ email, password }) => {
    return fetch(`http://localhost:3000/signin`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => response(res));
  };
  
  
  export const getUser = (jwt) => {
    return fetch(`http://localhost:3000/users/me`, {
      method: 'GET',
      headers: {
        ...headers,
        'Authorization': `Bearer ${jwt}`,
      }
    }).then((res) => response(res));
  };


