import React from 'react';
import { render } from '@testing-library/react-native';
import MessageBubble from '@/components/chat/MessageBubble'; 

describe('MessageBubble', () => {
  it('renders message correctly', () => {
    const { getByText } = render(<MessageBubble message="Hello world!" />);
    expect(getByText('Hello world!')).toBeTruthy();
  });

  it('renders avatar for received messages', () => {
    const { getByTestId } = render(
      <MessageBubble message="Hi" avatar="https://avatar.com/user.png" />
    );

    const avatarImage = getByTestId('message-avatar');
    expect(avatarImage.props.source.uri).toBe('https://avatar.com/user.png');
  });

  it('does not render avatar for sender messages', () => {
    const { queryByTestId } = render(
      <MessageBubble message="Hi" isSender />
    );
    expect(queryByTestId('message-avatar')).toBeNull();
  });

  it('applies correct background color', () => {
    const { getByTestId, rerender } = render(
        <MessageBubble message="Sent message" isSender />
    );

    expect(getByTestId('message-bubble')).toHaveStyle({ backgroundColor: '#E8DB4B' });

    rerender(<MessageBubble message="Received message" />);
    expect(getByTestId('message-bubble')).toHaveStyle({ backgroundColor: '#A86F52' });
  });

});
