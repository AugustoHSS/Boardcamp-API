import connection from '../database/database.js';
import customersSchema from '../schemas/customersSchema.js';

export default async function customersInputRulesMiddleware(request, response, next) {
  const clientInput = request.body;
  const existCpf = await connection.query('SELECT * FROM customers WHERE cpf=$1', [clientInput.cpf]);
  const validation = customersSchema.validate(request.body);

  if (validation.error) {
    console.log(validation.error);
    return response.sendStatus(400);
  }

  if (existCpf.rowCount !== 0) {
    return response.sendStatus(409);
  }
  next();
}
