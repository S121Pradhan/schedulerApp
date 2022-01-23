const Pool = require("pg").Pool;
const dbprop = require("../dbprop.json");
const pool = new Pool(dbprop);

const create_venue_method = (body) => {
  return new Promise(function (resolve, reject) {
    const { name, address, coordinates_url, images_url, owner } = body;
    pool.query(
      "INSERT INTO venues (name, address, coordinates_url, images_url, owner) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, address, coordinates_url, images_url, owner],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A new venue has been added: `);
      }
    );
  });
};

const get_venue_method = () => {
  return new Promise(function (resolve, reject) {
    pool.query("Select * from venues", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const get_venueById_method = (id) => {
  return new Promise(function (resolve, reject) {
    console.log("getting by id", id);
    pool.query("Select * from venues where Id = $1", [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};

const update_venue_method = (body, resourceId) => {
  return new Promise(function (resolve, reject) {
    console.log("body", body);
    const { name, address, coordinates_url, images_url, owner } = body;
    var updateQuery = "Update venues set ";
    var counter = 1;
    var queryVarArry = [];
    if (name) {
      updateQuery += "name=$" + counter + ",";
      queryVarArry.push(name);
      counter++;
    }
    if (address) {
      updateQuery += "address=$" + counter + ",";
      queryVarArry.push(address);
      counter++;
    }
    if (coordinates_url) {
      updateQuery += "coordinates_url=$" + counter + ",";
      queryVarArry.push(coordinates_url);
      counter++;
    }
    if (images_url) {
      updateQuery += "images_url=$" + counter + ",";
      queryVarArry.push(images_url);
      counter++;
    }
    if (owner) {
      updateQuery += "owner=$" + counter + ",";
      queryVarArry.push(owner);
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

const delete_venue_method = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query("Delete from venues where id=$1", [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`venue has been deleted with id`, id);
    });
  });
};

module.exports = {
  create_venue_method,
  get_venue_method,
  update_venue_method,
  delete_venue_method,
  get_venueById_method,
};
