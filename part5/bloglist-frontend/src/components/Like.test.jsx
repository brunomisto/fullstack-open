import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Like from './Like';

test('when like is clicked twice, event handler is called twice', async () => {
  const mockHandler = jest.fn();
  render(<Like onClick={mockHandler} />);

  const user = userEvent.setup();
  const like = screen.queryByText('like');
  await user.click(like);
  await user.click(like);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
