import db from '../db';

const mostLikedArticles = async () => {
  await db.query(
    `SELECT * FROM articles
    ORDER BY claps DESC
    LIMIT 6`
    , []);
};

export default mostLikedArticles;
