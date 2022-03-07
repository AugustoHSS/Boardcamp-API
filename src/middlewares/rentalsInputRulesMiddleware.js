import connection from '../database/database.js';
import rentalsSchema from '../schemas/rentalsSchema.js';

export default async function gamesInputRules(request, response, next) {
  const clientInput = request.body;
  const validation = rentalsSchema.validate(request.body);
  const existCustomer = await connection.query('SELECT * FROM customers WHERE id=$1', [clientInput.customerId]);
  const existGame = await connection.query('SELECT * FROM games WHERE id=$1', [clientInput.gameId]);
  const numberRentals = await connection.query('SELECT * FROM rentals WHERE "gameId"=$1 AND "returnDate" IS NULL', [clientInput.gameId]);
  if (existCustomer.rowCount === 0
     || existGame.rowCount === 0
     || clientInput.daysRented <= 0
     || existGame.rows[0].stockTotal <= numberRentals.rowCount) {
    return response.sendStatus(400);
  }

  if (validation.error) {
    return response.sendStatus(422);
  }

  next();
}
