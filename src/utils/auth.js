/**
 * Описание авторизации пользователя
 */

export const BASE_URL = 'https://auth.nomoreparties.co';

const getResponse = (res) => {
  res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
};

export const register = (email, password) => {
  return fetch (`${BASE_URL}/sign-up`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
    },
    body: JSON.stringify({email, password})
  })
    .then((res) => getResponse(res));
};

export const login = (email, password) => {
  return fetch (`${BASE_URL}/sign-in`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
    },
    body: JSON.stringify({email, password})
  })
    .then((res) => getResponse(res));
};

export const getData = (token) => {
  return fetch (`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
    .then((res) => getResponse(res));
};
