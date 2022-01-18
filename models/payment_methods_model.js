const Pool = require('pg').Pool
const dbprop = require("../dbprop.json");
const pool = new Pool(dbprop);

const create_payment_method = (body) => {
  return new Promise(function(resolve, reject) {
    const { qr_code, upi_id, mobile } = body
    pool.query('INSERT INTO payment_methods (qr_code, upi_id, mobile) VALUES ($1, $2, $3) RETURNING *', [qr_code, upi_id, mobile], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new payment method has been added placed: ${results.rows[0]}`)
    })
  })
}

module.exports = {
  create_payment_method,
}