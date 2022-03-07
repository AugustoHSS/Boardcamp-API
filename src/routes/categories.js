import express from 'express';
import verifyCategoriesSchemaMiddleware from '../middlewares/verifyCategoriesSchemaMiddleWare.js';
import { getCategories, insertCategories } from '../controllers/categoriesController.js';

const categoriesRouter = express.Router();
categoriesRouter.get('/categories', getCategories);
categoriesRouter.post('/categories', verifyCategoriesSchemaMiddleware, insertCategories);

export default categoriesRouter;
