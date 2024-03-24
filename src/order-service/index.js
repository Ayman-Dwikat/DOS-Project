// Import necessary modules
const express = require("express"); // Express framework for building web applications
const axios = require("axios"); // Axios for making HTTP requests
const cors = require("cors"); // CORS middleware for enabling cross-origin resource sharing
const app = express(); // Create an instance of Express application
const port = 3006; // Define the port number on which the server will run

// Enable CORS middleware
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Define a POST endpoint for making a purchase
app.post("/purch", async (req, res) => {
  // Extract order details from the request body
  const order = {
    id: req.body.id, // Extract book ID
    orderCost: req.body.orderCost, // Extract order cost
  };

  try {
    // Make a POST request to the catalog server to process the order
    const response = await axios.post(
      `http://catalog-server:3005/order`, // URL of the catalog server
      order // Data to be sent in the request body
    );

    // Log the response from the catalog server
    console.log(response.data);

    // Send a response indicating that the request was successfully sent to the catalog server
    res.send({ message: "Send Request To Catalog Server" });
  } catch (err) {
    // Log any errors that occur during the request
    console.log(err);

    // Send an error response with status code 400 if an error occurs
    res.status(400).send({ error: err });
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//____________________________________________________________________________________________________________

// const expressLib = require("express");
// const sqliteLib = require("sqlite3").verbose();
// const database = new sqliteLib.Database("d.db");
// const httpLib = require("axios");
// const corsLib = require("cors");
// const server = expressLib();
// const serverPort = 3007;
// server.use(corsLib());
// server.use(expressLib.json());
// server.use(expressLib.urlencoded({ extended: true }));

// server.post("/buy", async (request, response) => {
//   const purchaseOrder = {
//     itemId: request.body.id,
//     totalCost: request.body.orderCost,
//   };
//   try {
//     const serverResponse = await httpLib.post(
//       `http://catalogue-server:3005/order`,
//       purchaseOrder
//     );
//     console.log(serverResponse.data);

//     response.send({ message: "Request Sent To Catalogue Server" });
//   } catch (error) {
//     console.log(error);
//     response.status(400).send({ error: error });
//   }
// });

// server.listen(serverPort, () => {
//   console.log(`Server is active on http://localhost:${serverPort}`);
// });
