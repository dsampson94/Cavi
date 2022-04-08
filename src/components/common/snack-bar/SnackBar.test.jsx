/* eslint-disable */
import React from 'react';
import { render } from '@testing-library/react';

import SnackBar from './SnackBar';

describe('SnackBar', () => {
  const notices = [
    { id: 'adwa213', message: 'test 1' },
    { id: 'zdws5r3', message: 'test 2' }
  ];

  test('should render notices correctly', () => {
    const { container } = render(<SnackBar notices={ notices } />);

    expect(container).toHaveTextContent('test 1');
    expect(container).toHaveTextContent('test 2');
  });

  test('should add new notices to when updated', () => {
    const { container, rerender } = render(<SnackBar notices={ notices } />);

    expect(container).toHaveTextContent('test 1');
    expect(container).toHaveTextContent('test 2');

    rerender(<SnackBar notices={ [...notices, { id: '_awd12', message: 'newly added' }] } />);

    expect(container).toHaveTextContent('newly added');
  });

  test('should remove stale notices when updated', () => {
    const { container, rerender } = render(
      <SnackBar notices={ notices } />
    );

    expect(container).toHaveTextContent('test 1');
    expect(container).toHaveTextContent('test 2');

    rerender(<SnackBar notices={ [{ id: 'adwa213', title: 'test 1' }] } />);
    expect(container).not.toHaveTextContent('test 2');
  });
});
