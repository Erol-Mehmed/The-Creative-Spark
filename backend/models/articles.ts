import db from '../db';

export default {
  getArticles: async () => {
    const result = await db.query('SELECT * FROM articles', []);

    return result.rows;
  },
};
