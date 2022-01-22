const Pool = require("pg").Pool;
const dbprop = require("../dbprop.json");
const pool = new Pool(dbprop);

const create_payment_method = (body) => {
  return new Promise(function (resolve, reject) {
    const { qr_code, upi_id, mobile } = body;
    pool.query(
      "INSERT INTO payment_methods (qr_code, upi_id, mobile) VALUES ($1, $2, $3) RETURNING *",
      [qr_code, upi_id, mobile],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A new payment method has been added placed: `);
      }
    );
  });
};

const get_payment_method = () => {
  return new Promise(function (resolve, reject) {
    pool.query("Select * from payment_methods", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const get_byId_payment_method = (id) => {
  return new Promise(function (resolve, reject) {
    console.log("getting by id", id);
    pool.query(
      "Select * from payment_methods where Id = $1",
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

const update_payment_method = (body, resourceId) => {
  return new Promise(function (resolve, reject) {
    console.log("body", body);
    const { qr_code, upi_id, mobile } = body;
    var updateQuery = "Update payment_methods set ";
    var counter = 1;
    var queryVarArry = [];
    if (qr_code) {
      updateQuery += "qr_code=$" + counter + ",";
      queryVarArry.push(qr_code);
      counter++;
    }
    if (upi_id) {
      updateQuery += "upi_id=$" + counter + ",";
      queryVarArry.push(upi_id);
      counter++;
    }
    if (mobile) {
      updateQuery += "mobile=$" + counter + "";
      queryVarArry.push(mobile);
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

const delete_payment_method = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "Delete from payment_methods where id=$1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`payment method has been deleted with id`, id);
      }
    );
  });
};

module.exports = {
  create_payment_method,
  get_payment_method,
  update_payment_method,
  delete_payment_method,
  get_byId_payment_method,
};
