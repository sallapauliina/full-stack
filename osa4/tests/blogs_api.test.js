const { test, before, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");
const config = require("../utils/config");
const mongoose = require("mongoose");
const { initialBlogs } = require("./test_helper");
const api = supertest(app);

beforeEach(async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);

    console.log("Connected to MongoDB");

    await Blog.deleteMany({});

    await Blog.insertMany(initialBlogs);
    console.log("Inserted blogs:", initialBlogs.length);
  } catch (error) {
    console.error("Error populating database:", error.message);
    process.exit(1);
  }
});

test("should return blogs as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("should return correct amount of blogs", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("should return blogs with right unique identifier property", async () => {
  const response = await api.get("/api/blogs");
  response.body.forEach((blog, index) => {
    assert.strictEqual(blog.id, helper.initialBlogs[index]._id);
  });
});

test("should add a new blog and increase the blog count by one", async () => {
  const newBlog = {
    content: {
      title: "test title",
      author: "test author",
      url: "http://www.testurl.com",
      likes: 5,
    },
  };

  const initialResponse = await api.get("/api/blogs");
  const initialCount = initialResponse.body.length;

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const finalResponse = await api.get("/api/blogs");
  const finalCount = finalResponse.body.length;

  assert.strictEqual(finalCount, initialCount + 1);
});

test("should add zero to likes if likes is undefined", async () => {
  const newBlog = {
    content: {
      title: "test title",
      author: "Edsger W. Dijkstra",
      url: "http://www.joku.com",
    },
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const addedBlog = response.body.find(
    (blog) => blog.content.title === newBlog.content.title
  );

  assert.strictEqual(addedBlog.content.likes, 0);
});
test("should return 400 bad request if title is missing", async () => {
  const newBlog = {
    content: {
      author: "test author",
      url: "http://example.com",
      likes: 5,
    },
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("should return 400 bad request if url is missing", async () => {
  const newBlog = {
    content: {
      title: "test blog",
      author: "test author",
      likes: 5,
    },
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});
after(async () => {
  await mongoose.connection.close();
});
