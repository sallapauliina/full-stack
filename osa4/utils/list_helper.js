const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((tot, blog) => tot + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  let favorite = blogs[0];
  for (let blog of blogs) {
    if (blog.likes > favorite.likes) {
      favorite = blog;
    }
  }
  return favorite;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const authorCounts = {};

  blogs.forEach((blog) => {
    const author = blog.author;
    if (authorCounts[author]) {
      authorCounts[author] += 1;
    } else {
      authorCounts[author] = 1;
    }
  });

  let topAuthor = null;
  let maxBlogs = 0;

  Object.keys(authorCounts).forEach((author) => {
    if (authorCounts[author] > maxBlogs) {
      maxBlogs = authorCounts[author];
      topAuthor = author;
    }
  });
  return {
    author: topAuthor,
    blogs: maxBlogs,
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const authorLikes = {};
  blogs.forEach((blog) => {
    const author = blog.author;
    const likes = blog.likes;

    if (authorLikes[author]) {
      authorLikes[author] += likes;
    } else {
      authorLikes[author] = likes;
    }
  });

  let topAuthor = null;
  let maxLikes = 0;

  Object.keys(authorLikes).forEach((author) => {
    if (authorLikes[author] > maxLikes) {
      topAuthor = author;
      maxLikes = authorLikes[author];
    }
  });

  return {
    author: topAuthor,
    likes: maxLikes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
