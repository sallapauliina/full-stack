const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

// blogsRouter.get("/", (request, response) => {
//   console.log("BLOG get");
//   Blog.find({}).then((blogs) => {
//     response.json(blogs);
//   });
// });

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  let addedBlog = request.body;
  if (
    !addedBlog.content ||
    !addedBlog.content.title ||
    !addedBlog.content.url
  ) {
    return response.status(400).json({ error: "Title and url are required." });
  }
  if (!addedBlog.content) {
    addedBlog.content = { likes: 0 };
  } else if (!addedBlog.content.likes) {
    addedBlog.content.likes = 0;
  }

  const blog = new Blog(addedBlog);
  const savedBlog = await blog.save();

  response.status(201).json(savedBlog);
});

module.exports = blogsRouter;
