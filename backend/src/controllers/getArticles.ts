/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from 'express';
import  articles from '../models/articles';
import users from '../models/users';

const getArticles = async (req: Request, res: Response) => {
  const section = req.query.section?.toString() || '';
  const usersLocal = await users.getUsers();
  const currentArticles = await articles.getArticles(section);
  const result = resultCreation(usersLocal, currentArticles);

  return res.json(result);
};

const resultCreation = (usersLocal: any[], currentArticles: any[]) => {  
  const result: object[] = [];
    
  for (let i = 0; i < currentArticles.length; i += 1) {
    const currentUser = usersLocal.find(obj => obj.id === currentArticles[i].author_id);
    
    result.push(
      {
        author: {
          name: currentUser.name,
          slug: currentUser.slug,
          image: currentUser.image,
        },
        article: currentArticles[i],
      }
    );
  }
  
  return result;
};

export default getArticles;
