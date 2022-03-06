import express from 'express';
import verifyGamesSchemaMiddleware from '../middlewares/verifyGamesSchemaMiddleware.js';
import gamesInputRules from '../middlewares/gamesInputRulesMIddleware.js';
import { getGames, insertGames } from '../controllers/gamesController.js';

const gamesRouter = express.Router();
gamesRouter.get('/games', getGames);
gamesRouter.post('/games', verifyGamesSchemaMiddleware, gamesInputRules, insertGames);

export default gamesRouter;
