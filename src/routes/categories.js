import express from 'express';
import verifyCategoriesSchemaMiddleware from '../middlewares/verifyCategoriesSchemaMiddleWare.js';
import { getCategories, insertCategories } from '../controllers/categoriesController.js';

const categoriesRouter = express.Router();
categoriesRouter.get('/customers', getCategories);
categoriesRouter.post('/customers', verifyCategoriesSchemaMiddleware, insertCategories);

export default categoriesRouter;
