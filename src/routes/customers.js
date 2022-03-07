import express from 'express';
import customersInputRulesMiddleware from '../middlewares/customersInputRulesMiddleware.js';
import {
  getCustomers, insertCustomers, updateCustomers, getCustomersId,
} from '../controllers/customersController.js';

const customersRouter = express.Router();
customersRouter.get('/customers/:id', getCustomersId);
customersRouter.get('/customers', getCustomers);
customersRouter.post('/customers', customersInputRulesMiddleware, insertCustomers);
customersRouter.put('/customers/:id', customersInputRulesMiddleware, updateCustomers);

export default customersRouter;
