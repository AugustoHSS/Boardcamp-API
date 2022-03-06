import connection from '../database/database.js';

export default async function gamesInputRules(request, response, next) {
  const clientInput = request.body;
  const existName = await connection.query('SELECT * FROM games WHERE name=$1', [clientInput.name]);
  const selectedCategories = await connection.query('SELECT * FROM categories WHERE id=$1', [clientInput.categoryId]);
  if (existName.rowCount !== 0) return response.sendStatus(409);
  if (clientInput.name === ' '
    || clientInput.stockTotal <= 0
    || clientInput.pricePerDay <= 0
    || selectedCategories.rowCount === 0) {
    return response.sendStatus(400);
  }
  next();
}
