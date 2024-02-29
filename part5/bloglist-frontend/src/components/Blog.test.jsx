/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Blog from './Blog';

const blog = {
  title: 'my cool blog',
  author: 'robert de niro',
  likes: 2,
  url: 'http://blog.com',
};

test('render only title and author by default', () => {
  render(<Blog blog={blog} />);

  const titleAuthor = screen.findByText(`${blog.title} ${blog.author}`);
  expect(titleAuthor).toBeDefined();

  const url = screen.queryByText(blog.url);
  const likes = screen.queryByText(`likes ${blog.likes}`);
  expect(url).toBeNull();
  expect(likes).toBeNull();
});

test('url and likes are shown when show button clicked', () => {
  render(<Blog blog={blog} />);

  const user = userEvent.setup();

  const button = screen.queryByText('show');
  user.click(button);

  const url = screen.queryByText(blog.url);
  const likes = screen.queryByText(`likes ${blog.likes}`);

  expect(url).toBeDefined();
  expect(likes).toBeDefined();
});
