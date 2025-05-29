const mongoose = require("mongoose");
const Blog = require("../models/blog");
const { initialBlogs } = require("./test_helper");
const config = require("../utils/config");

const populate = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);

    console.log("Connected to MongoDB");

    await Blog.deleteMany({});
    console.log("Cleared blogs");

    await Blog.insertMany(initialBlogs);
    console.log("Inserted blogs:", initialBlogs.length);

    await mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error populating database:", error.message);
    process.exit(1);
  }
};

populate();
