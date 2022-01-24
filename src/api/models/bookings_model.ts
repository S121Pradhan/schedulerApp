import { Pool } from "pg";
import * as dbprop from "../../dbprop.json";
const pool = new Pool(dbprop);

class Bookings {
  async create_booking_method(body: any): Promise<String> {
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
  }

  async get_booking_method(): Promise<any> {
    return new Promise(function (resolve, reject) {
      pool.query("Select * from bookings", (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      });
    });
  }

  async get_bookingById_method(id: String): Promise<any> {
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
  }

  async update_booking_method(body: any, resourceId: String) {
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
  }

  async delete_booking_method(id: String) {
    return new Promise(function (resolve, reject) {
      pool.query("Delete from bookings where id=$1", [id], (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`booking has been deleted with id`);
      });
    });
  }
}

const bookingsHandler = new Bookings();

export default bookingsHandler;
