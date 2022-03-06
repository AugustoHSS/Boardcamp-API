import express from 'express';
import categoriesRouter from './categories.js';
import gamesRouter from './games.js';

const router = express.Router();
router.use(categoriesRouter);
router.use(gamesRouter);

export default router;
