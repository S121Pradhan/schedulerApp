const Pool = require("pg").Pool;
const dbprop = require("../dbprop.json");
const pool = new Pool(dbprop);

const create_booking_method = (body) => {
  return new Promise(function (resolve, reject) {
    const { customer_id, winning_bid_id } = body;
    pool.query(
      "INSERT INTO bookings (customer_id, winning_bid_id) VALUES ($1, $2) RETURNING *",
      [customer_id, winning_bid_id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A new booking has been added: `);
      }
    );
  });
};

const get_booking_method = () => {
  return new Promise(function (resolve, reject) {
    pool.query("Select * from bookings", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const get_bookingById_method = (id) => {
  return new Promise(function (resolve, reject) {
    console.log("getting by id", id);
    pool.query(
      "Select * from bookings where Id = $1",
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

const update_booking_method = (body, resourceId) => {
  return new Promise(function (resolve, reject) {
    console.log("body", body);
    const { customer_id, deleted, winning_bid_id } = body;
    var updateQuery = "Update bookings set ";
    var counter = 1;
    var queryVarArry = [];
    if (customer_id) {
      updateQuery += "customer_id=$" + counter + ",";
      queryVarArry.push(customer_id);
      counter++;
    }
    if (deleted) {
      updateQuery += "deleted=$" + counter + ",";
      queryVarArry.push(deleted);
      counter++;
    }
    if (winning_bid_id) {
      updateQuery += "winning_bid_id=$" + counter + ",";
      queryVarArry.push(winning_bid_id);
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

const delete_booking_method = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query("Delete from bookings where id=$1", [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`booking has been deleted with id`, id);
    });
  });
};

module.exports = {
  create_booking_method,
  get_booking_method,
  update_booking_method,
  delete_booking_method,
  get_bookingById_method,
};
