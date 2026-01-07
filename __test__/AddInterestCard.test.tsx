import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AddInterestCard from '../components/interest/AddInterestCard';
import { UserInterestService } from '@/services/userInterestService';
import { Alert } from 'react-native';

describe('AddInterestCard', () => {
  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <AddInterestCard initKeyword="test" />
    );

    expect(getByText('NOT FOUND')).toBeTruthy();
    expect(getByPlaceholderText('Enter keyword').props.value).toBe('test');
    expect(getByText('Add Interest')).toBeTruthy();
  });

  it('shows alert if fields are empty', async () => {
    const { getByText } = render(<AddInterestCard />);

    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

    fireEvent.press(getByText('Add Interest'));

    expect(alertSpy).toHaveBeenCalledWith('Please fill in both fields');

    alertSpy.mockRestore();
  });

  it('calls addUserInterest when input is valid', async () => {
    const { getByText } = render(
        <AddInterestCard initKeyword="React" initCategoryId="tech" />
    );

    (UserInterestService.addUserInterest as jest.Mock).mockResolvedValue({});

    fireEvent.press(getByText('Add Interest'));

    await waitFor(() => {
        expect(UserInterestService.addUserInterest).toHaveBeenCalledWith('tech', 'React');
    });
  });

});
