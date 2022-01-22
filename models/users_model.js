const Pool = require("pg").Pool;
const dbprop = require("../dbprop.json");
const pool = new Pool(dbprop);

const create_user_method = (body) => {
  return new Promise(function (resolve, reject) {
    const { mobile_no, id_proof, payment_receiver_id } = body;
    pool.query(
      "INSERT INTO users (mobile_no, id_proof, payment_receiver_id) VALUES ($1, $2, $3) RETURNING *",
      [mobile_no, id_proof, payment_receiver_id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A new user has been added: `);
      }
    );
  });
};

const get_user_method = () => {
  return new Promise(function (resolve, reject) {
    pool.query("Select * from users", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const get_userById_method = (id) => {
  return new Promise(function (resolve, reject) {
    console.log("getting by id", id);
    pool.query("Select * from users where Id = $1", [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};

const update_user_method = (body, resourceId) => {
  return new Promise(function (resolve, reject) {
    console.log("body", body);
    const { mobile_no, id_proof, payment_receiver_id } = body;
    var updateQuery = "Update users set ";
    var counter = 1;
    var queryVarArry = [];
    if (mobile_no) {
      updateQuery += "mobile_no=$" + counter + ",";
      queryVarArry.push(mobile_no);
      counter++;
    }
    if (id_proof) {
      updateQuery += "id_proof=$" + counter + ",";
      queryVarArry.push(id_proof);
      counter++;
    }
    if (payment_receiver_id) {
      updateQuery += "payment_receiver_id=$" + counter + ",";
      queryVarArry.push(payment_receiver_id);
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

const delete_user_method = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query("Delete from users where id=$1", [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`user has been deleted with id`, id);
    });
  });
};

module.exports = {
  create_user_method,
  get_user_method,
  update_user_method,
  delete_user_method,
  get_userById_method,
};
