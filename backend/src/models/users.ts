import db from '../configs/db';

export default {
  getUsers: async () => {
    const result = await db.query('SELECT * FROM users', []);

    return result.rows;
  },
};
