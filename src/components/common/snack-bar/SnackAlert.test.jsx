import React from 'react';
import { render } from '@testing-library/react';

import { SNACK_CRITICAL, SNACK_INFO, SNACK_SUCCESS } from '../../../tools/general/system-variables.util';

import SnackAlert from './SnackAlert';

describe('SnackAlert', () => {

  test('should output the correct classes for each status', () => {
    let wrapper;
    wrapper = render(<SnackAlert message={ 'test' } status={ SNACK_CRITICAL } />);
    expect(wrapper.container.querySelector('.snack')).toHaveClass('snack--critical');

    wrapper = render(<SnackAlert message={ 'test' } status={ SNACK_SUCCESS } />);
    expect(wrapper.container.querySelector('.snack')).toHaveClass('snack--success');

    wrapper = render(<SnackAlert message={ 'test' } status={ SNACK_INFO } />);
    expect(wrapper.container.querySelector('.snack')).toHaveClass('snack--info');
  });

  test('should render as success status, if no status is specified', () => {
    const { container } = render(<SnackAlert message={ 'test' } />);

    const snack = container.querySelector('.snack');
    expect(snack).toHaveClass('snack--success');
  });
});
