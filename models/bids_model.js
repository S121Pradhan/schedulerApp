const Pool = require('pg').Pool
const dbprop = require("../dbprop.json");
const pool = new Pool(dbprop);

const create_bid = (body) => {
  return new Promise(function(resolve, reject) {
    const { bidder_id, venue_id, bid_price, slot_id, transaction_id, event_date } = body
    pool.query('INSERT INTO bids (bidder_id, venue_id, bid_price, slot_id, transaction_id, event_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [bidder_id, venue_id, bid_price, slot_id, transaction_id, event_date], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new bid has been added placed: ${results.rows[0]}`)
    })
  })
}

module.exports = {
  create_bid,
}