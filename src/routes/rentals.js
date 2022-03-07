import express from 'express';
import rentalsInputRules from '../middlewares/rentalsInputRulesMiddleware.js';
import {
  getRentals, insertRentals, returnRentals, deleteRentals,
} from '../controllers/rentalsController.js';

const rentalsRouter = express.Router();
rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals', rentalsInputRules, insertRentals);
rentalsRouter.post('/rentals/:id/return', returnRentals);
rentalsRouter.delete('/rentals/:id', deleteRentals);

export default rentalsRouter;
