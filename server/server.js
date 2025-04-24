const mongoose = require("mongoose");
require("dotenv").config();
const colors = require("colors"); // Make sure to install this if not already
const app = require("./app");

// Log env variable to confirm loading
console.log("JWT_SECRET:", process.env.JWT_SECRET);

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const dbURI = process.env.DATABASE;

// MongoDB Connection with recommended options
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Time to wait for server selection
  socketTimeoutMS: 45000,         // Close sockets after 45 seconds of inactivity
})
.then(() => {
  console.log("✅ Connected to MongoDB".cyan.underline.bold);
  console.log("Environment:", `${process.env.NODE_ENV}`.yellow);
})
.catch((err) => {
  console.error("❌ Initial MongoDB connection error:", err.message);
});

// MongoDB connection events
const db = mongoose.connection;

db.on("error", (error) => {
  console.error(" Connection error:", error);
});

db.on("disconnected", () => {
  console.log("❌ MongoDB disconnected");
});

db.on("reconnected", () => {
  console.log("✅ MongoDB reconnected");
});

// Start the server
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`.green.bold);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle graceful shutdown (e.g., Ctrl + C)
process.on("SIGINT", async () => {
  console.log("\nSIGINT received. Closing MongoDB connection...".yellow);
  await mongoose.connection.close();
  console.log("MongoDB connection closed. Exiting process.".yellow);
  process.exit(0);
});
