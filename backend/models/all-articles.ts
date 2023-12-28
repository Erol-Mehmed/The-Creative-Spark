import db from '../db';

const articles = async () => {
  try {
    return await db.query('SELECT * FROM articles', []);
  } catch(err) {
    console.log(err);
  }
};

console.log('all articles model:', articles);

export default articles;
