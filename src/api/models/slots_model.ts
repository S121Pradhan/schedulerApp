import { Pool } from "pg";
import * as dbprop from "../../dbprop.json";
const pool = new Pool(dbprop);

class slots {
  create_slot_method = (body) => {
    return new Promise(function (resolve, reject) {
      const { name, start_time, end_time } = body;
      pool.query(
        "INSERT INTO slots (name, start_time, end_time) VALUES ($1, $2, $3) RETURNING *",
        [name, start_time, end_time],
        (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(`A new slot has been added: `);
        }
      );
    });
  };

  get_slot_method = () => {
    return new Promise(function (resolve, reject) {
      pool.query("Select * from slots", (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      });
    });
  };

  get_slotById_method = (id) => {
    return new Promise(function (resolve, reject) {
      console.log("getting by id", id);
      pool.query(
        "Select * from slots where Id = $1",
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

  update_slot_method = (body, resourceId) => {
    return new Promise(function (resolve, reject) {
      console.log("body", body);
      const { name, start_time, end_time } = body;
      var updateQuery = "Update slots set ";
      var counter = 1;
      var queryVarArry = [];
      if (name) {
        updateQuery += "name=$" + counter + ",";
        queryVarArry.push(name);
        counter++;
      }
      if (start_time) {
        updateQuery += "start_time=$" + counter + ",";
        queryVarArry.push(start_time);
        counter++;
      }
      if (end_time) {
        updateQuery += "end_time=$" + counter + ",";
        queryVarArry.push(end_time);
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

  delete_slot_method = (id) => {
    return new Promise(function (resolve, reject) {
      pool.query("Delete from slots where id=$1", [id], (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`slot has been deleted with id`);
      });
    });
  };
}

const slotsHandler = new slots();

export default slotsHandler;
