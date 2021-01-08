import '@testing-library/jest-dom';

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Buttton from './index';

test('displays a Button', () => {
    render(<Buttton label="Button Test" />);
    expect(screen.getByText('Button Test')).toBeInTheDocument();
});

test('should return true', () => {
    expect(true).toBe(true);
});
