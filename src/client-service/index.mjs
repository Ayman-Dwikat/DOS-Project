// Import necessary modules
import { Command } from "commander"; // Commander for building command-line interfaces
import inquirer from "inquirer"; // Inquirer for interactive command-line user interfaces
import axios from "axios"; // Axios for making HTTP requests

// Create a new instance of the Command object
const program = new Command();
program.name("CLI").description("CLI for DOS Project").version("1.0.0");

// Define questions for different actions
let questionSearch = [
  {
    type: "input",
    name: "bookTitle",
    message: "Enter topic to get all books belonging to that: ",
  },
];

let questionInfo = [
  {
    type: "number",
    name: "itemNumber",
    message: "Enter item number to get all details about it: ",
  },
];

let questionPurchase = [
  {
    type: "number",
    name: "itemNumber",
    message: "Enter item number to purchase it: ",
  },
  {
    type: "number",
    name: "money",
    message: "Enter amount of money to pay: ",
  },
];

// Define commands for different actions
program
  .command("search-book-title")
  .alias("search")
  .description("search about specific book using book topic")
  .action(() => {
    // Prompt the user to enter a book topic
    inquirer
      .prompt(questionSearch)
      .then(async (answers) => {
        try {
          // Send a GET request to search for books with the specified topic
          const result = await axios.get(
            `http://localhost:8083/catalog-server/search/${answers.bookTitle}`
          );
          console.log("Response:", result.data); // Log the response from the server
        } catch (error) {
          console.error("Error during request:", error.message); // Log any errors that occur during the request
        }
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else went wrong
        }
      });
  });

program
  .command("info-book-item-number")
  .alias("info")
  .description("info about specific book using item number")
  .action(() => {
    // Prompt the user to enter an item number
    inquirer
      .prompt(questionInfo)
      .then(async (answers) => {
        try {
          // Send a GET request to retrieve information about the book with the specified item number
          const result = await axios.get(
            `http://localhost:8083/catalog-server/info/${answers.itemNumber}`
          );
          console.log("Response:", result.data); // Log the response from the server
        } catch (error) {
          console.error("Error during request:", error.message); // Log any errors that occur during the request
        }
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else went wrong
        }
      });
  });

program
  .command("purchase-book-by-item-number")
  .alias("purchase")
  .description("purchase specific book using item number")
  .action(() => {
    // Prompt the user to enter an item number and the amount of money to pay
    inquirer
      .prompt(questionPurchase)
      .then(async (answers) => {
        try {
          // Send a POST request to purchase the book with the specified item number
          const result = await axios.post(
            `http://localhost:8083/order-server/purch`,
            { id: answers.itemNumber, orderCost: answers.money }
          );
          console.log("Response:", result.data); // Log the response from the server
        } catch (error) {
          console.error("Error during request:", error.message); // Log any errors that occur during the request
        }
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else went wrong
        }
      });
  });

// Parse the command-line arguments
program.parse();

//__________________________________________________________________________________

// import { Command } from "commander";
// import inquirer from "inquirer";
// import axios from "axios";

// const program = new Command();
// program.name("CLI").description("CLI for DOS Project").version("1.0.0");
// let questionSearch = [
//   {
//     type: "input",
//     name: "bookTitle",
//     message: "Enter topic to get all books belonging to that: ",
//   },
// ];

// let questionInfo = [
//   {
//     type: "number",
//     name: "itemNumber",
//     message: "Enter item number to get all details about it: ",
//   },
// ];

// let questionPurchase = [
//   {
//     type: "number",
//     name: "itemNumber",
//     message: "Enter item number to purchase it: ",
//   },
//   {
//     type: "number",
//     name: "money",
//     message: "Enter amount of money to pay: ",
//   },
// ];

// program
//   .command("search-book-title")
//   .alias("search")
//   .description("search about specific book using book topic")
//   .action(() => {
//     inquirer
//       .prompt(questionSearch)
//       .then(async (answers) => {
//         try {
//           const result = await axios.get(
//             `http://localhost:8083/catalog-server/search/${answers.bookTitle}`
//           );
//           console.log("Response:", result.data);
//         } catch (error) {
//           console.error("Error during request:", error.message);
//         }
//       })
//       .catch((error) => {
//         if (error.isTtyError) {
//           // Prompt couldn't be rendered in the current environment
//         } else {
//           // Something else went wrong
//         }
//       });
//   });

// program
//   .command("info-book-item-number")
//   .alias("info")
//   .description("info about specific book using item number")
//   .action(() => {
//     inquirer
//       .prompt(questionInfo)
//       .then(async (answers) => {
//         try {
//           const result = await axios.get(
//             `http://localhost:8083/catalog-server/info/${answers.itemNumber}`
//           );
//           console.log("Response:", result.data);
//         } catch (error) {
//           console.error("Error during request:", error.message);
//         }
//       })
//       .catch((error) => {
//         if (error.isTtyError) {
//           // Prompt couldn't be rendered in the current environment
//         } else {
//           // Something else went wrong
//         }
//       });
//   });

// program
//   .command("purchase-book-by-item-number")
//   .alias("purchase")
//   .description("purchase specific book using item number")
//   .action(() => {
//     inquirer
//       .prompt(questionPurchase)
//       .then(async (answers) => {
//         try {
//           const result = await axios.post(
//             `http://localhost:8083/order-server/purch`,
//             { id: answers.itemNumber, orderCost: answers.money }
//           );
//           console.log("Response:", result.data);
//         } catch (error) {
//           console.error("Error during request:", error.message);
//         }
//       })
//       .catch((error) => {
//         if (error.isTtyError) {
//           // Prompt couldn't be rendered in the current environment
//         } else {
//           // Something else went wrong
//         }
//       });
//   });

// program.parse();
