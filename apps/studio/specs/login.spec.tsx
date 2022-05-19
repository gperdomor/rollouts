import { render } from '@testing-library/react';
import React from 'react';
import Login from '../pages/app/login';

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Login />);
    expect(baseElement).toBeTruthy();
  });
});
