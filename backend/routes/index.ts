import { Router } from 'express';
import allArticles from '../controllers/all-articles';

const router = Router();

router.get('/', (req, res) => {
  console.log('router');
  res.send(allArticles);
});

export default router;
