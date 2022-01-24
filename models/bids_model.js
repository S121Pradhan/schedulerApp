const Pool = require("pg").Pool;
const dbprop = require("../dbprop.json");
const pool = new Pool(dbprop);

const create_bid_method = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      bidder_id,
      venue_id,
      bid_price,
      slot_id,
      transaction_id,
      event_date,
    } = body;
    pool.query(
      "INSERT INTO bids (bidder_id, venue_id, bid_price, slot_id, transaction_id, event_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [bidder_id, venue_id, bid_price, slot_id, transaction_id, event_date],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A new bid has been added: `);
      }
    );
  });
};

const get_bid_method = () => {
  return new Promise(function (resolve, reject) {
    pool.query("Select * from bids", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const get_bidById_method = (id) => {
  return new Promise(function (resolve, reject) {
    console.log("getting by id", id);
    pool.query("Select * from bids where Id = $1", [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};

const update_bid_method = (body, resourceId) => {
  return new Promise(function (resolve, reject) {
    console.log("body", body);
    const {
      bidder_id,
      venue_id,
      bid_price,
      slot_id,
      transaction_id,
      event_date,
    } = body;
    var updateQuery = "Update bids set ";
    var counter = 1;
    var queryVarArry = [];
    if (bidder_id) {
      updateQuery += "bidder_id=$" + counter + ",";
      queryVarArry.push(bidder_id);
      counter++;
    }
    if (venue_id) {
      updateQuery += "venue_id=$" + counter + ",";
      queryVarArry.push(venue_id);
      counter++;
    }
    if (bid_price) {
      updateQuery += "bid_price=$" + counter + ",";
      queryVarArry.push(bid_price);
      counter++;
    }
    if (slot_id) {
      updateQuery += "slot_id=$" + counter + ",";
      queryVarArry.push(slot_id);
      counter++;
    }
    if (transaction_id) {
      updateQuery += "transaction_id=$" + counter + ",";
      queryVarArry.push(transaction_id);
      counter++;
    }
    if (event_date) {
      updateQuery += "slot_id=$" + counter + ",";
      queryVarArry.push(event_date);
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

const delete_bid_method = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query("Delete from bids where id=$1", [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`bid has been deleted with id`, id);
    });
  });
};

module.exports = {
  create_bid_method,
  get_bid_method,
  update_bid_method,
  delete_bid_method,
  get_bidById_method,
};
