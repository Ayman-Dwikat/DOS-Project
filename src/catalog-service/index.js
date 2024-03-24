// Import necessary modules
const express = require("express"); // Express framework for building web applications
const sqlite3 = require("sqlite3").verbose(); // SQLite3 for interacting with SQLite database
const axios = require("axios"); // Axios for making HTTP requests
const path = require("path"); // Path module for working with file and directory paths
const cors = require("cors"); // CORS middleware for enabling cross-origin resource sharing

// Create an instance of Express application
const app = express();
const port = 3005; // Define the port number on which the server will run

// Middleware to parse JSON bodies and enable CORS
app.use(express.json());
app.use(cors());

// Define variables to store order details
let orderPrice = 0;
let numberIt;
let test;
let lastResult;
let lastText;

// Define a POST endpoint for processing orders
app.post("/order", (req, res) => {
  const order = req.body; // Extract order details from the request body
  const searchId = req.body.id;
  const orderCost = req.body.orderCost;

  // Query the database to retrieve book details based on ID
  db.all(`SELECT * FROM items WHERE id = ?`, [searchId], (err, row) => {
    if (err) {
      console.error(err.message);
      return;
    }

    if (!!row[0]) {
      numberIt = row[0].numberOfItems;
      orderPrice = row[0].bookCost;
      let numberOfItems = row[0].numberOfItems - 1;

      if (orderCost >= orderPrice) {
        const remainingAmount = orderCost - orderPrice;

        // Update the database with the new number of items
        db.run(
          `UPDATE items SET numberOfItems = ? WHERE id = ?`,
          [numberOfItems, searchId],
          function (err) {
            if (err) {
              console.error("Error updating record:", err.message);
              return;
            }
          }
        );
      }
    }
    // Query the database again to get the updated row after the order is processed
    db.all(
      `SELECT * FROM items WHERE id = ?`,
      [searchId],
      (err, updatedRow) => {
        if (err) {
          console.error(err.message);
          return;
        }

        if (updatedRow) {
          if (updatedRow.length != 0) {
            test = { numberOfItemsBeforeUpdate: numberIt, data: updatedRow };
            if (numberIt === updatedRow[0].numberOfItems) {
              lastResult = false;
            } else {
              lastResult = true;
            }
            lastText = `Bought book ${updatedRow[0].bookTitle}`;
          }

          // Send response based on whether the order was successful
          if (lastResult) {
            res.send({ result: { status: "success", message: lastText } });
          } else {
            res.send({
              result: { status: "fail", message: "Failed to buy the book!" },
            });
          }
        }
      }
    );
  });
});

// Create SQLite database and define schema
const db = new sqlite3.Database("database.db");
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY ,  
    bookTopic TEXT,
    numberOfItems INTEGER ,
    bookCost INTEGER,  
    bookTitle TEXT
  )`
  );
});

// Define endpoint to search for books based on topic
app.get("/search/:bookTopic", (req, res) => {
  let bookTopic = req.params.bookTopic.trim();
  db.serialize(() => {
    // Query the database to retrieve books based on topic
    db.all(`SELECT * FROM items WHERE bookTopic="${bookTopic}"`, (err, row) => {
      if (err) {
        console.log(err);
        return;
      }
      res.send({ items: row }); // Send response with retrieved books
    });
  });
});

// Define endpoint to retrieve book information based on ID
app.get("/info/:id", (req, res) => {
  let id = req.params.id;
  db.serialize(() => {
    // Query the database to retrieve book information based on ID
    db.all(
      `SELECT id, numberOfItems, bookCost FROM items WHERE id=${id}`,
      (err, row) => {
        if (err) {
          console.log(err);
          return;
        }
        res.json({ item: row }); // Send response with retrieved book information
      }
    );
  });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//_____________________________________________________________________________________

// const express = require('express');
// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('database.db');
// const axios = require("axios")
// const path = require('path');
// const cors = require("cors")

// const app = express();
// const port = 3005;

// app.use(express.json());
// app.use(cors())

// let orderPrice =0;
// let numberIt ;
// let test;
// let lastResult;
// let lastText;
// app.post("/order",(req,res)=>{
//   const order = req.body
//   const searchId = req.body.id
//   const orderCost = req.body.orderCost

// db.all(`SELECT * FROM items WHERE id = ?`, [searchId], (err, row) => {
//     if (err) {
//       console.error(err.message);
//       return;
//     }

//     if (!!row[0]) {
//       numberIt = row[0].numberOfItems;
//       orderPrice = row[0].bookCost;
//       let numberOfItems = row[0].numberOfItems-1;
//       console.log(orderPrice)
//       console.log(orderCost)

//       if (orderCost >= orderPrice) {

//         const remainingAmount = orderCost - orderPrice;
//         db.run(
//           `UPDATE items SET numberOfItems = ? WHERE id = ?`,
//           [numberOfItems, searchId],
//           function (err) {
//             if (err) {
//               console.error('Error updating record:', err.message);
//               return;
//             }

//           }

//         );
//       }

//     }
//     db.all(`SELECT * FROM items WHERE id = ?`, [searchId], (err, updatedRow) => {
//       if (err) {
//           console.error(err.message);
//           return;
//         }
//       if(updatedRow){
//         // console.log({ numberOfItemsBeforeUpdate:numberIt,data: updatedRow[0]})

//         if(updatedRow.length != 0){
//           // console.log(updatedRow[0],"eeee")
//           test = { numberOfItemsBeforeUpdate:numberIt,data: updatedRow}
//           if(numberIt === updatedRow[0].numberOfItems){
//             lastResult = false
//           }
//           else{
//             lastResult = true

//           }
//           lastText = `Bought book ${updatedRow[0].bookTitle}`
//         }
//         // console.log(test)
//         if(lastResult)
//           res.send({result:{status:"success",message:lastText}});
//         else
//           res.send({result:{status:"fail",message:"Failed to buy The book!!"}})
//       }

//     })

//   });

// });

// db.serialize(() => {
//   db.run(
//     `CREATE TABLE IF NOT EXISTS items (
//     id INTEGER PRIMARY KEY ,
//     bookTopic TEXT,
//     numberOfItems INTEGER ,
//     bookCost INTEGER,
//     bookTitle TEXT
//   )`
//   );
//   // db.run(
//   //   // i used INSERT OR REPLACE for nodemon
//   //   'INSERT OR REPLACE INTO items (id, bookTopic , numberOfItems, bookCost , bookTitle) VALUES (?, ?, ?, ?,?)',
//   //   [1,"Distributed System", 1000, 3000, 'How to get a good grade in DOS in 40 minutes a day']
//   // );
//   // [1,"Distributed System", 1000, 3000, 'How to get a good grade in DOS in 40 minutes a day']
//   // [3,"Undergraduate School", 12, 1000, 'Xen and the Art of Surviving Undergraduate School']
//   // [4,"Undergraduate School", 21, 900, 'Cooking for the Impatient Undergrad']
// });

// app.get('/search/:bookTopic', (req, res) => {
//   let bookTopic = req.params.bookTopic.trim();
//   console.log(bookTopic);
//   db.serialize(() => {
//     db.all(`SELECT * FROM items WHERE bookTopic="${bookTopic}"`, (err, row) => {
//       if (err) {
//         console.log(err);
//         return;
//       }
//       for (i = 0; i < row.length; i++) {
//         console.log(
//           row[i].id,
//           row[i].numberOfItems,
//           row[i].bookCost,
//           row[i].bookTopic
//         );
//       }
//       // console.log(row);
//       res.send({items:row});
//     });
//   });
// });

// app.get('/info/:id', (req, res) => {
//   let id = req.params.id;
//   console.log(id);
//   db.serialize(() => {
//     // i used serialize to solve of close data base for data displayed completely
//     db.all(`SELECT id,numberOfItems,bookCost FROM items WHERE id=${id}`, (err, row) => {
//       if (err) {
//         console.log(err);
//         return;
//       }

//       console.log(row);
//       res.json({item:row});
//     });
//   });
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
