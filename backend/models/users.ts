import db from '../db';

const users = async () => {
  await db.query('SELECT * FROM users', []);
};

export default users;