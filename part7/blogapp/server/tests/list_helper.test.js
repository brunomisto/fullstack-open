const { test, describe } = require("node:test");
const assert = require("node:assert");
const {
  favoriteBlog,
  mostBlogs,
  mostLikes,
  totalLikes,
  dummy,
} = require("../utils/list_helper");
const helper = require("./test_helper");

describe("list helper", () => {
  describe("dummy", () => {
    test("returns 1", () => {
      assert.strictEqual(dummy(), 1);
    });
  });

  describe("favorite blog", () => {
    test("empty list will return empty object", () => {
      assert.deepStrictEqual(favoriteBlog([]), {});
    });

    test("list with one blog return the unique blog", () => {
      const blogs = [helper.blogs[0]];

      const expectedBlog = {
        title: blogs[0].title,
        author: blogs[0].author,
        likes: blogs[0].likes,
      };

      assert.deepStrictEqual(favoriteBlog(blogs), expectedBlog);
    });

    test("list of blogs returns most liked", () => {
      const { title, author, likes } = helper.blogs[2];
      const expectedBlog = { title, author, likes };

      assert.deepStrictEqual(favoriteBlog(helper.blogs), expectedBlog);
    });
  });

  describe("most blogs", () => {
    test("empty list returns empty object", () => {
      assert.deepStrictEqual(mostBlogs([]), {});
    });

    test("list with one author returns its unique author", () => {
      const blogs = [helper.blogs[0]];

      const expectedOutput = {
        author: blogs[0].author,
        blogs: 1,
      };

      assert.deepStrictEqual(mostBlogs(blogs), expectedOutput);
    });

    test("returns object with author with most blogs", () => {
      const expectedOutput = {
        author: "Robert C. Martin",
        blogs: 3,
      };

      assert.deepStrictEqual(mostBlogs(helper.blogs), expectedOutput);
    });
  });

  describe("most likes", () => {
    test("empty list returns empty object", () => {
      assert.deepStrictEqual(mostLikes([]), {});
    });

    test("list with one author returns its unique author", () => {
      const blogs = [helper.blogs[0]];

      const expectedOutput = {
        author: blogs[0].author,
        likes: blogs[0].likes,
      };

      assert.deepStrictEqual(mostLikes(blogs), expectedOutput);
    });

    test("returns object with author with most likes", () => {
      const expectedOutput = {
        author: "Edsger W. Dijkstra",
        likes: 17,
      };

      assert.deepStrictEqual(mostLikes(helper.blogs), expectedOutput);
    });
  });

  describe("total likes", () => {
    test("when list is empty return 0", () => {
      assert.strictEqual(totalLikes([]), 0);
    });

    test("sum is correct", () => {
      assert.strictEqual(totalLikes(helper.blogs), 36);
    });

    test("return blog likes when list has length 1", () => {
      const blogs = [helper.blogs[0]];

      assert.strictEqual(totalLikes(blogs), blogs[0].likes);
    });
  });
});
