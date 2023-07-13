import axios from 'axios';

export async function login(email, password) {
  console.log(email, password);
 const user = await axios.post("http://localhost:3000/api/login", {email, password});
 console.log(user);
};

export async function register(username, email, password) {
  await axios.post("http://localhost:3000/api/register", {username, email, password});
};
