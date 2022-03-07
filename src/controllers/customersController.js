import connection from '../database/database.js';

export async function getCustomers(request, response) {
  const filter = request.query.cpf;
  try {
    if (filter) {
      const customers = await connection.query('SELECT * FROM customers WHERE customers.cpf LIKE $1', [`${filter}%`]);
      return response.send(customers.rows);
    }

    const customers = await connection.query('SELECT * FROM customers');
    return response.send(customers.rows);
  } catch {
    return response.sendStatus(500);
  }
}
export async function insertCustomers(request, response) {
  const clientInput = request.body;
  try {
    await connection.query(
      `INSERT INTO customers (name,phone,cpf,birthday)
         VALUES ($1,$2,$3,$4)`,
      Object.values(clientInput),
    );
    return response.sendStatus(201);
  } catch {
    return response.sendStatus(500);
  }
}
export async function updateCustomers(request, response) {
  const customerId = request.params.id;
  const clientInput = request.body;
  try {
    const existId = await connection.query('SELECT * FROM customers WHERE id=$1', [customerId]);
    if (existId.rowCount === 0) return response.sendStatus(404);
    await connection.query(`UPDATE customers SET
       name=$1, phone=$2, cpf=$3, birthday=$4
       WHERE id =$5`, [...Object.values(clientInput), customerId]);
    return response.sendStatus(200);
  } catch {
    return response.sendStatus(500);
  }
}

export async function getCustomersId(request, response) {
  const customerId = request.params.id;
  try {
    const customers = await connection.query('SELECT * FROM customers WHERE id=$1', [customerId]);
    if (customers.rowCount === 0) return response.sendStatus(404);
    return response.send(customers.rows);
  } catch {
    return response.sendStatus(500);
  }
}
