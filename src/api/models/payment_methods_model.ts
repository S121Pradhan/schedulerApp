import { Pool } from "pg";
import * as dbprop from "../../dbprop.json";
import { AnySrvRecord } from "dns";
const pool = new Pool(dbprop);

class Payments {
  async create_payment_method(body: any): Promise<any> {
    const { qr_code, upi_id, mobile } = body;
    try {
      await pool.query(
        "INSERT INTO payment_methods (qr_code, upi_id, mobile) VALUES ($1, $2, $3) RETURNING *",
        [qr_code, upi_id, mobile]
      );
      return "Payments inserted successfully";
    } catch (e) {
      console.log("Error", e);
      return "Error in payment method";
    }
  }

  async get_payment_method(): Promise<any> {
    try {
      const results = await pool.query("Select * from payment_methods");
      return results.rows;
    } catch (e) {
      console.log("Error", e);
      return "Error in payment method";
    }
  }

  async get_byId_payment_method(id: string): Promise<any> {
    try {
      const results = await pool.query(
        "Select * from payment_methods where Id = $1",
        [id]
      );
      return results.rows;
    } catch (e) {
      console.log("Error", e);
      return "Error in payment method";
    }
  }

  async update_payment_method(body: any, resourceId: string): Promise<any> {
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
      updateQuery += "mobile=$" + counter + ",";
      queryVarArry.push(mobile);
      counter++;
    }
    updateQuery = updateQuery.substring(0, updateQuery.length - 1);
    queryVarArry.push(resourceId);
    console.log(updateQuery);
    console.log(queryVarArry);
    const results = await pool.query(
      updateQuery + " where id=$" + counter,
      queryVarArry
    );
    return results;
  }

  async delete_payment_method(id: string): Promise<any> {
    const results = await pool.query(
      "Delete from payment_methods where id=$1",
      [id]
    );
    return results;
  }
}

const paymentsHandler = new Payments();

export default paymentsHandler;
