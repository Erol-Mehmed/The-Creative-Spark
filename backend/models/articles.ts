import { QueryResult } from 'pg';
import db from '../db';

export default {
  getArticles: async (section: string) => {
    let result: QueryResult<object> = {
      rows: [],
      command: '',
      rowCount: null,
      oid: 0,
      fields: []
    };
    
    if (section === 'all-articles') {
      result = await db.query('SELECT * FROM articles', []);
    } else {
      result = await db.query(
        `SELECT * FROM articles
        ORDER BY claps DESC
        LIMIT 6`
        , []);
    }
    
    return result.rows;
  },
};
