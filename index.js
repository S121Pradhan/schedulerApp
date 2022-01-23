const express = require("express");
const app = express();
const port = 3001;

const bids_model = require("./models/bids_model");
const payment_methods_model = require("./models/payment_methods_model");
const users_model = require("./models/users_model");
const venues_model = require("./models/venues_model");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger_output.json");

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

app.post("/bids", (req, res) => {
  bids_model
    .create_bid(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/payment_methods", (req, res) => {
  const body = req.body;
  payment_methods_model
    .create_payment_method(body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get("/payment_methods", (req, res) => {
  const body = req.body;
  console.log("in get method");
  payment_methods_model
    .get_payment_method(body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get("/payment_methods/:id", (req, res) => {
  const id = req.params.id;
  console.log("in get by id method");
  payment_methods_model
    .get_byId_payment_method(id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.patch("/payment_methods/:id", (req, res) => {
  const resourceId = req.params.id;
  const body = req.body;
  payment_methods_model
    .update_payment_method(body, resourceId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.delete("/payment_methods/:id", (req, res) => {
  const id = req.params.id;
  payment_methods_model
    .delete_payment_method(id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

// USERS
app.post("/users", (req, res) => {
  const body = req.body;
  users_model
    .create_user_method(body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get("/users", (req, res) => {
  const body = req.body;
  console.log("in get method");
  users_model
    .get_user_method(body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  console.log("in get by id method");
  users_model
    .get_userById_method(id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.patch("/users/:id", (req, res) => {
  const resourceId = req.params.id;
  const body = req.body;
  users_model
    .update_user_method(body, resourceId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  users_model
    .delete_user_method(id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

// VENUES
app.post("/venues", (req, res) => {
  const body = req.body;
  venues_model
    .create_venue_method(body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get("/venues", (req, res) => {
  const body = req.body;
  console.log("in get method");
  venues_model
    .get_venue_method(body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get("/venues/:id", (req, res) => {
  const id = req.params.id;
  console.log("in get by id method");
  venues_model
    .get_venueById_method(id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.patch("/venues/:id", (req, res) => {
  const resourceId = req.params.id;
  const body = req.body;
  venues_model
    .update_venue_method(body, resourceId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.delete("/venues/:id", (req, res) => {
  const id = req.params.id;
  venues_model
    .delete_venue_method(id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
