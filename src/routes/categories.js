import express from 'express';

import { getCategories, insertCategories } from '../controllers/categoriesController.js';

const categoriesRouter = express.Router();
categoriesRouter.get('/categories', getCategories);
categoriesRouter.post('/categories', insertCategories);

export default categoriesRouter;
