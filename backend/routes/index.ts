import { Router } from 'express';
import articles from '../controllers/articles';

const router = Router();

router.get('/', articles);

export default router;
