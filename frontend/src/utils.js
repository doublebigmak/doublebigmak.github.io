// src/utils.js

export const getStored = (key, defaultValue) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};

export const setStored = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};