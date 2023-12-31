import { Router } from 'express';
import getArticles from '../controllers/getArticles';

const router = Router();

router.get('/', getArticles);

export default router;
