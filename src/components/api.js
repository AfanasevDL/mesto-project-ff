export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-7",
  headers: {
    authorization: "4c127fa8-5d01-43f5-ba09-bcbbcfc68d88",
    "Content-Type": "application/json",
  },
};

export const getResData = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const getUserInfo = async () => {
  return fetch(config.baseUrl + "/users/me", {
    headers: config.headers,
  }).then(getResData);
};

export const getInitialCards = async () => {
  return fetch(config.baseUrl + "/cards", {
    headers: config.headers,
  }).then(getResData);
};

export const getInitialInfo = async () => {
  return Promise.all([getUserInfo(), getInitialCards()]);
};

export const editProfile = async (userProfileData) => {
  return fetch(config.baseUrl + "/users/me", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userProfileData.name,
      about: userProfileData.about,
    }),
  }).then(getResData);
};

export const postNewCard = async (newCard) => {
  return fetch(config.baseUrl + "/cards", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: newCard.name,
      link: newCard.link,
      alt: newCard.name,
    }),
  }).then(getResData);
};

export const putLike = async (cardId) => {
  return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(getResData);
};

export const deleteLike = async (cardId) => {
  return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResData);
};

export const deleteCardAPI = async (cardId) => {
  return fetch(config.baseUrl + `/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResData);
};

export const updateNewAvatar = async (avatarLink) => {
  return fetch(config.baseUrl + "/users/me/avatar", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then(getResData);
};
