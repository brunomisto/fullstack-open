/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NewBlog from "./NewBlog";

const blog = {
  title: "my cool blog",
  author: "robert de niro",
  likes: 2,
  url: "http://blog.com",
};

test("handler is called with correct parameters", async () => {
  const mockHandler = jest.fn();
  render(<NewBlog createBlog={mockHandler} />);

  const user = userEvent.setup();
  const submit = screen.queryByText("add");
  const title = screen.queryByPlaceholderText("blog title...");
  const author = screen.queryByPlaceholderText("blog author...");
  const url = screen.queryByPlaceholderText("blog url...");

  await user.type(title, blog.title);
  await user.type(author, blog.author);
  await user.type(url, blog.url);
  await user.click(submit);

  expect(mockHandler.mock.calls[0][0].title).toBe(blog.title);
  expect(mockHandler.mock.calls[0][0].author).toBe(blog.author);
  expect(mockHandler.mock.calls[0][0].url).toBe(blog.url);
});
