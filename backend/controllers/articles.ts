import { Request, Response } from 'express';
import  articles from '../models/articles';
import users from '../models/users';

const getArticles = async (req: Request, res: Response) => {
  const section = req.query.section?.toString() || '';
  const usersLocal = await users.getUsers();
  const currentArticles = await articles.getArticles(section);
  const result = resultCreation(section, usersLocal, currentArticles);

  console.log(usersLocal);

  return res.json(result);
};

const resultCreation = (section: string, usersLocal: object[], currentArticles: object[]) => {
  if (section === 'all-articles') {
    const result: object[] = [];
 
    for (let i = 0; i < currentArticles.length; i += 1) {
      result.push(
        {
          author: {
            usersLocal[currentArticles[i].authorId]
          }
        }
      );
    }

  } else {

  }
};

export default getArticles;
