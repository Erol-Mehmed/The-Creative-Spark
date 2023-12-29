import { Request, Response } from 'express';
import  articles from '../models/articles';

export default {
  getArticles: async (req: Request, res: Response) => {
    console.log('controller:', await articles.getArticles());
        
    return res.json(await articles.getArticles());
  },
};
