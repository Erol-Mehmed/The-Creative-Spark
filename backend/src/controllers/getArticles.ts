/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from 'express';
import  articles from '../models/articles';
import users from '../models/users';

const getArticles = async (req: Request, res: Response) => {
  const section = req.query.section?.toString() || '';  
  const usersLocal = await users.getUsers();
  const currentArticles = await articles.getArticles(section === 'author-articles' ? 'all-articles' : section);
  const result = resultCreation(section, usersLocal, currentArticles, req.params.slug);

  return res.json(result);
};

const resultCreation = (section: string, usersLocal: any[], currentArticles: any[], authorName: string) => {
  if (['all-articles', 'most-liked-articles'].includes(section)) {
    return creationLoop(false, usersLocal, currentArticles, {});
  } else {
    const author = usersLocal.find(obj => obj.slug === authorName);
    currentArticles = currentArticles.filter(obj => obj.author_id === author.id);
    
    return creationLoop(true, [], currentArticles, author);
  }
};

const creationLoop = (authorArticles: boolean, usersLocal: any[], currentArticles: any[], author: any) => {
  const result: object[] = [];
  let user = authorArticles ? author : {};
  let authorInfo: object = {};

  for (let i = 0; i < currentArticles.length; i += 1) {
    if (!authorArticles) {
      user = usersLocal.find(obj => obj.id === currentArticles[i].author_id);
      authorInfo = {
        name: user.name,
        slug: user.slug,
        image: user.image,
      };
    } else {
      authorInfo = {
        name: user.name,
        description: user.description,
        image: user.image,
      };
    }

    result.push({
      author: authorInfo,
      article: currentArticles[i],
    });
  }

  return result;
};

export default getArticles;
