import express from 'express';
import gamesInputRules from '../middlewares/gamesInputRulesMiddleware.js';
import { getGames, insertGames } from '../controllers/gamesController.js';

const gamesRouter = express.Router();
gamesRouter.get('/games', getGames);
gamesRouter.post('/games', gamesInputRules, insertGames);

export default gamesRouter;
