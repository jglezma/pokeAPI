const USERNAME_KEY = "bgs_pokemon_username";

export const setUsername = (username: string) => {
  localStorage.setItem(USERNAME_KEY, username);
};

export const getUsername = () => {
  return localStorage.getItem(USERNAME_KEY);
};
