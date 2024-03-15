const express = require("express");
const { database } = require("./database");
const cors = require("cors");
const seed = require("./database/seed/seeder.js");
const api = require("./api");

const DATABASE_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/messageBoard";
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", api);

const init = async () => {
  try {
    // MongoDB connection
    await database.connect(DATABASE_URI);
    console.log("Connected to MongoDB");

    await seed();
    console.log("Seeded database");

    // Server start
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Could not connect to MongoDB", err);
  }
};

init();
