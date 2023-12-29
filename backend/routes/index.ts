import { Router } from 'express';
import articles from '../controllers/articles';
import requestHandler from '../utils/request-handler';

const router = Router();

router.get('/', articles.getArticles);

export default router;
