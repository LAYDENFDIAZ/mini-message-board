const express = require("express");
const { database } = require("./database");
const cors = require("cors");
const seed = require("./database/seed/seeder.js");
const api = require("./api"); // Import the API routes module

// Define the URI for the MongoDB database
const DATABASE_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/messageBoard";
const PORT = process.env.PORT || 3001; // Define the port for the server to listen on

const app = express(); // Create an Express application
app.use(cors()); // Enable CORS middleware
app.use(express.json()); // Enable JSON body parsing

// Mount API routes
app.use("/api", api); // Mount the API routes defined in the 'api' module under the '/api' base URL

// Function to initialize the server
const init = async () => {
  try {
    // Connect to MongoDB database
    await database.connect(DATABASE_URI);
    console.log("Connected to MongoDB");

    // Seed the database with initial data
    await seed();
    console.log("Seeded database");

    // Start the server and listen for incoming requests
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    // Handle errors that occur during initialization
    console.error("Could not connect to MongoDB", err);
  }
};

init(); // Initialize the server
