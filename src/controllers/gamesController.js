import connection from '../database/database.js';

export async function insertGames(request, response) {
  const clientInput = request.body;
  try {
    await connection.query(
      `INSERT INTO games (name,image,"stockTotal","categoryId","pricePerDay")
       VALUES ($1,$2,$3,$4,$5)`,
      Object.values(clientInput),
    );
    return response.sendStatus(201);
  } catch {
    return response.sendStatus(500);
  }
}

export async function getGames(request, response) {
  const filter = request.query.name;

  try {
    if (filter) {
      const games = await connection.query(`SELECT games.*,categories.name as "categoryName" FROM games
            JOIN categories ON games."categoryId"=categories.id
            WHERE LOWER(games.name) LIKE LOWER($1)`, [`${filter}%`]);

      return response.send(games.rows);
    }

    const games = await connection.query(
      `SELECT games.*,categories.name as "categoryName" FROM games
            JOIN categories ON games."categoryId"=categories.id`,
    );
    return response.send(games.rows);
  } catch {
    return response.sendStatus(500);
  }
}
