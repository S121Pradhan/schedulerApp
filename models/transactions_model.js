const Pool = require("pg").Pool;
const dbprop = require("../dbprop.json");
const pool = new Pool(dbprop);

const create_transaction_method = (body) => {
  return new Promise(function (resolve, reject) {
    const { sender_id, receiver_id, amount } = body;
    pool.query(
      "INSERT INTO transactions (sender_id, receiver_id, amount) VALUES ($1, $2, $3) RETURNING *",
      [sender_id, receiver_id, amount],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A new transaction has been added: `);
      }
    );
  });
};

const get_transaction_method = () => {
  return new Promise(function (resolve, reject) {
    pool.query("Select * from transactions", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const get_transactionById_method = (id) => {
  return new Promise(function (resolve, reject) {
    console.log("getting by id", id);
    pool.query(
      "Select * from transactions where Id = $1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  });
};

const update_transaction_method = (body, resourceId) => {
  return new Promise(function (resolve, reject) {
    console.log("body", body);
    const { sender_id, receiver_id, amount } = body;
    var updateQuery = "Update transactions set ";
    var counter = 1;
    var queryVarArry = [];
    if (sender_id) {
      updateQuery += "sender_id=$" + counter + ",";
      queryVarArry.push(sender_id);
      counter++;
    }
    if (receiver_id) {
      updateQuery += "receiver_id=$" + counter + ",";
      queryVarArry.push(receiver_id);
      counter++;
    }
    if (amount) {
      updateQuery += "amount=$" + counter + ",";
      queryVarArry.push(amount);
      counter++;
    }
    updateQuery = updateQuery.substring(0, updateQuery.length - 1);
    queryVarArry.push(resourceId);
    pool.query(
      updateQuery + " where id=$" + counter,
      queryVarArry,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  });
};

const delete_transaction_method = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "Delete from transactions where id=$1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`transaction has been deleted with id`, id);
      }
    );
  });
};

module.exports = {
  create_transaction_method,
  get_transaction_method,
  update_transaction_method,
  delete_transaction_method,
  get_transactionById_method,
};
