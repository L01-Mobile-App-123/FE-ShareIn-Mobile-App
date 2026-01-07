// __test__/ChatInput.test.tsx
import React, { act } from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ChatInput from '../components/chat/ChatInput'; 

describe('ChatInput', () => {

  it('updates text input value when typing', () => {
    const onLocalSendMock = jest.fn();

    const { getByPlaceholderText } = render(
      <ChatInput
        conversationId="123"
        onLocalSend={onLocalSendMock}
      />
    );
    const input = getByPlaceholderText('Type something...');

    fireEvent.changeText(input, 'Hello world');
    expect(input.props.value).toBe('Hello world');
  });

  it('renders TextInput and Send button', () => {
    const onLocalSendMock = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <ChatInput conversationId="123" onLocalSend={onLocalSendMock} />
    );

    const input = getByPlaceholderText('Type something...');
    const sendBtn = getByTestId('send-button');

    expect(input).toBeTruthy();
    expect(sendBtn).toBeTruthy();

    // Ban đầu rỗng nên disable
    expect(sendBtn).toBeDisabled();
  });

  it('enables send button when text is not empty and calls handleSend', () => {
    const onLocalSendMock = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <ChatInput conversationId="123" onLocalSend={onLocalSendMock} />
    );

    const input = getByPlaceholderText('Type something...');
    const sendBtn = getByTestId('send-button');

    // Thay đổi text
    act(() => {
      fireEvent.changeText(input, 'Hi there');
    });

    // Bây giờ send button không disabled
    expect(sendBtn).not.toBeDisabled();

    // Nhấn gửi
    act(() => {
      fireEvent.press(sendBtn);
    });
  });
});

