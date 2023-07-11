import axios from 'axios';

export async function login(username, password) {

};

export async function register(username, email, password) {
  await axios.post("http://localhost:3000/api/register", {username, email, password});
};
