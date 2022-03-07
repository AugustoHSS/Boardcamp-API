import connection from '../database/database.js';

export async function getCategories(request, response) {
  try {
    const categories = await connection.query('SELECT * FROM categories');
    return response.send(categories.rows);
  } catch {
    return response.sendStatus(500);
  }
}

export async function insertCategories(request, response) {
  if (request.body.name === ' ') return response.sendStatus(400);
  try {
    const existName = await connection.query('SELECT * FROM categories WHERE name=$1', [request.body.name]);
    if (existName.rows.length !== 0) return response.sendStatus(409);
    await connection.query('INSERT INTO categories (name) VALUES ($1)', [request.body.name]);
    return response.sendStatus(201);
  } catch {
    return response.sendStatus(500);
  }
}
