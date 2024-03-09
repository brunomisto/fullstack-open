const dummy = () => 1;

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  if (blogs.length === 1) {
    return blogs[0].likes;
  }

  return blogs.reduce((sum, current) => sum + current.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const favorite = blogs.reduce((mostLiked, current) => {
    if (current.likes > mostLiked.likes) {
      return current;
    }
    return mostLiked;
  });

  const { title, author, likes } = favorite;
  return { title, author, likes };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const authors = {};
  for (let i = 0; i < blogs.length; i += 1) {
    const blog = blogs[i];
    const hasAuthorName = Object.prototype.hasOwnProperty.call(
      authors,
      blog.author,
    );

    if (!hasAuthorName) {
      authors[blog.author] = 1;
    } else {
      authors[blog.author] += 1;
    }
  }

  const [authorName, authorBlogs] = Object.entries(authors).reduce(
    ([prevName, prevBlogs], [currentName, currentBlogs]) => {
      if (currentBlogs > prevBlogs) {
        return [currentName, currentBlogs];
      }
      return [prevName, prevBlogs];
    },
  );

  return {
    author: authorName,
    blogs: authorBlogs,
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const authors = {};
  for (let i = 0; i < blogs.length; i += 1) {
    const blog = blogs[i];
    const hasAuthorName = Object.prototype.hasOwnProperty.call(
      authors,
      blog.author,
    );

    if (!hasAuthorName) {
      authors[blog.author] = blog.likes;
    } else {
      authors[blog.author] += blog.likes;
    }
  }

  const [authorName, authorLikes] = Object.entries(authors).reduce(
    ([prevName, prevLikes], [currentName, currentLikes]) => {
      if (currentLikes > prevLikes) {
        return [currentName, currentLikes];
      }
      return [prevName, prevLikes];
    },
  );

  return {
    author: authorName,
    likes: authorLikes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
