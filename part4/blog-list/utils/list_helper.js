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

module.exports = { dummy, totalLikes, favoriteBlog };
