import express from "express";
const app = express();
const port = 3001;

import bids_model from "./api/models/bids_model";
import payment_methods_model from "./api/models/payment_methods_model";
import users_model from "./api/models/users_model";
import venues_model from "./api/models/venues_model";
import slots_model from "./api/models/slots_model";
import transactions_model from "./api/models/transactions_model";
import bookingsHandler from "./api/models/bookings_model";

import swaggerUi from "swagger-ui-express";
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
    .get_payment_method()
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
    .get_user_method()
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
    .get_venue_method()
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

// slots

app.post("/slots", (req, res) => {
  const body = req.body;
  slots_model
    .create_slot_method(body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get("/slots", (req, res) => {
  const body = req.body;
  console.log("in get method");
  slots_model
    .get_slot_method()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get("/slots/:id", (req, res) => {
  const id = req.params.id;
  console.log("in get by id method");
  slots_model
    .get_slotById_method(id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.patch("/slots/:id", (req, res) => {
  const resourceId = req.params.id;
  const body = req.body;
  slots_model
    .update_slot_method(body, resourceId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.delete("/slots/:id", (req, res) => {
  const id = req.params.id;
  slots_model
    .delete_slot_method(id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

// transactions
app.post("/transactions", (req, res) => {
  const body = req.body;
  transactions_model
    .create_transaction_method(body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get("/transactions", (req, res) => {
  const body = req.body;
  console.log("in get method");
  transactions_model
    .get_transaction_method()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get("/transactions/:id", (req, res) => {
  const id = req.params.id;
  console.log("in get by id method");
  transactions_model
    .get_transactionById_method(id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.patch("/transactions/:id", (req, res) => {
  const resourceId = req.params.id;
  const body = req.body;
  transactions_model
    .update_transaction_method(body, resourceId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.delete("/transactions/:id", (req, res) => {
  const id = req.params.id;
  transactions_model
    .delete_transaction_method(id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

// Bookings
app.post("/bookings", (req, res) => {
  const body = req.body;
  bookingsHandler
    .create_booking_method(body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get("/bookings", (req, res) => {
  const body = req.body;
  console.log("in get method");
  bookingsHandler
    .get_booking_method()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get("/bookings/:id", (req, res) => {
  const id = req.params.id;
  console.log("in get by id method");
  bookingsHandler
    .get_bookingById_method(id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.patch("/bookings/:id", (req, res) => {
  const resourceId = req.params.id;
  const body = req.body;
  bookingsHandler
    .update_booking_method(body, resourceId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.delete("/bookings/:id", (req, res) => {
  const id = req.params.id;
  bookingsHandler
    .delete_booking_method(id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

//bids

app.post("/bids", (req, res) => {
  const body = req.body;
  bids_model
    .create_bid_method(body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get("/bids", (req, res) => {
  const body = req.body;
  console.log("in get method");
  bids_model
    .get_bid_method()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get("/bids/:id", (req, res) => {
  const id = req.params.id;
  console.log("in get by id method");
  bids_model
    .get_bidById_method(id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.patch("/bids/:id", (req, res) => {
  const resourceId = req.params.id;
  const body = req.body;
  bids_model
    .update_bid_method(body, resourceId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.delete("/bids/:id", (req, res) => {
  const id = req.params.id;
  bids_model
    .delete_bid_method(id)
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
