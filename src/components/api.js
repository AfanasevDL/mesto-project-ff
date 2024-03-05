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

export const getUserIn = async () => {
  return fetch(config.baseUrl + "/users/me", {
    headers: config.headers,
  }).then((res) => getResData(res));
};

export const getInitialCards = async () => {
  return fetch(config.baseUrl + "/cards", {
    headers: config.headers,
  }).then((res) => getResData(res));
};

export const getInitialIn = async () => {
  return Promise.all([getUserIn(), getInitialCards()]);
};

export const reNewUserProfile = async (userProfileData) => {
  return fetch(config.baseUrl + "/users/me", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userProfileData.name,
      about: userProfileData.about,
    }),
  }).then((res) => getResData(res));
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
  }).then((res) => getResData(res));
};

export const putLike = async (cardId) => {
  return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => getResData(res));
};

export const deleteLike = async (cardId) => {
  return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => getResData(res));
};

export const deleteCardAPI = async (cardId) => {
  return fetch(config.baseUrl + `/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => getResData(res));
};

export const updateNewAvatar = async (avatarLink) => {
  return fetch(config.baseUrl + "/users/me/avatar", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then((res) => getResData(res));
};
