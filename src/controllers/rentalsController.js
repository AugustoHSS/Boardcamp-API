import dayjs from 'dayjs';
import connection from '../database/database.js';

export async function insertRentals(request, response) {
  const { customerId, gameId, daysRented } = request.body;
  try {
    const pricePerDay = await connection.query(`
    SELECT games."pricePerDay" FROM games WHERE id=$1
  `, [gameId]);
    const informationToInsert = {
      customerId,
      gameId,
      rentDate: dayjs().format('YYYY-MM-DD'),
      daysRented,
      returnDate: null,
      originalPrice: pricePerDay.rows[0].pricePerDay * daysRented,
      delayFee: null,
    };
    await connection.query(
      `INSERT INTO rentals
       ("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee")
           VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      Object.values(informationToInsert),
    );
    return response.sendStatus(201);
  } catch {
    return response.sendStatus(500);
  }
}

export async function getRentals(request, response) {
  const customerFilter = request.query.customerId;
  const gameFilter = request.query.gameId;
  try {
    if (gameFilter) {
      const rentals = await connection.query({
        text: `
                  SELECT rentals.*, customers.id, customers.name,games.id,games.name,games."categoryId",categories.name
                  FROM rentals
                  JOIN customers ON customers.id=rentals."customerId"
                  JOIN games ON games.id=rentals."gameId"
                  JOIN categories ON games."categoryId"=categories.id
                  WHERE rentals."gameId"=${gameFilter}
                  `,
        rowMode: 'array',
      });
      return response.send(rentals.rows.map((row) => {
        const [id, customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee,
          idCustomer, nameCustomer, idGame, nameGame, categoryId, categoryName] = row;
        return {
          id,
          customerId,
          gameId,
          rentDate,
          daysRented,
          returnDate,
          originalPrice,
          delayFee,
          customer: { id: idCustomer, name: nameCustomer },
          game: {
            id: idGame, name: nameGame, categoryId, categoryName,
          },
        };
      }));
    }
    if (customerFilter) {
      const rentals = await connection.query({
        text: `
              SELECT rentals.*, customers.id, customers.name,games.id,games.name,games."categoryId",categories.name
              FROM rentals
              JOIN customers ON customers.id=rentals."customerId"
              JOIN games ON games.id=rentals."gameId"
              JOIN categories ON games."categoryId"=categories.id
              WHERE rentals."customerId"=${customerFilter}
              `,
        rowMode: 'array',
      });
      return response.send(rentals.rows.map((row) => {
        const [id, customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee,
          idCustomer, nameCustomer, idGame, nameGame, categoryId, categoryName] = row;
        return {
          id,
          customerId,
          gameId,
          rentDate,
          daysRented,
          returnDate,
          originalPrice,
          delayFee,
          customer: { id: idCustomer, name: nameCustomer },
          game: {
            id: idGame, name: nameGame, categoryId, categoryName,
          },
        };
      }));
    }
    const rentals = await connection.query({
      text: `
        SELECT rentals.*, customers.id, customers.name,games.id,games.name,games."categoryId",categories.name
        FROM rentals
        JOIN customers ON customers.id=rentals."customerId"
        JOIN games ON games.id=rentals."gameId"
        JOIN categories ON games."categoryId"=categories.id
        `,
      rowMode: 'array',
    });
    return response.send(rentals.rows.map((row) => {
      const [id, customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee,
        idCustomer, nameCustomer, idGame, nameGame, categoryId, categoryName] = row;
      return {
        id,
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee,
        customer: { id: idCustomer, name: nameCustomer },
        game: {
          id: idGame, name: nameGame, categoryId, categoryName,
        },
      };
    }));
  } catch (error) {
    return response.sendStatus(500);
  }
}
export async function returnRentals(request, response) {
  const rentalId = request.params.id;
  let delayFee = 0;
  try {
    const newReturnDate = dayjs().format('YYYY-MM-DD');
    const existRental = await connection.query('SELECT * FROM rentals WHERE id=$1', [rentalId]);
    if (existRental.rowCount === 0) return response.sendStatus(404);
    const {
      rentDate, daysRented, gameId, returnDate,
    } = existRental.rows[0];
    const game = await connection.query(`SELECT * FROM games WHERE id=${gameId}`);
    const days = dayjs().diff(rentDate, 'day');
    if (returnDate !== null) return response.sendStatus(400);
    if (days >= daysRented) {
      delayFee = (days - daysRented) * game.rows[0].pricePerDay;
    }
    await connection.query(`UPDATE rentals SET
    "returnDate"=$1, "delayFee"=$2
    WHERE id =$3`, [newReturnDate, delayFee, rentalId]);
    return response.sendStatus(200);
  } catch (error) {
    return response.sendStatus(500);
  }
}
export async function deleteRentals(request, response) {
  const rentalId = request.params.id;
  try {
    const existRental = await connection.query('SELECT * FROM rentals WHERE id=$1', [rentalId]);
    if (existRental.rowCount === 0) return response.sendStatus(404);
    if (existRental.rows[0].returnDate === null) return response.sendStatus(400);
    await connection.query('DELETE FROM rentals WHERE id=s1', [rentalId]);
    return response.sendStatus(200);
  } catch (error) {
    return response.sendStatus(500);
  }
}
