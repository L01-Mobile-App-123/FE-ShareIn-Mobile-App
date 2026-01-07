import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

it('smoke test', () => {
  const { getByText } = render(<Text>Hello</Text>);
  expect(getByText('Hello')).toBeTruthy();
});
