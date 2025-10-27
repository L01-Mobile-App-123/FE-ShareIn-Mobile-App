import { Image, StyleSheet, Text, View } from 'react-native';

type MessageBubbleProps = {
  message: string;
  isSender?: boolean;
  avatar?: string;
};

export default function MessageBubble({
  message,
  isSender = false,
  avatar,
}: MessageBubbleProps) {
  return (
    <View
      style={[
        styles.container,
        { justifyContent: isSender ? 'flex-end' : 'flex-start' },
      ]}
    >
      {!isSender && (
        <Image
          source={{ uri: avatar || 'https://i.pravatar.cc/100?img=4' }}
          style={styles.avatar}
        />
      )}

      <View
        style={[
          styles.bubble,
          {
            backgroundColor: isSender ? '#FDD835' : '#A86F52',
            borderBottomLeftRadius: isSender ? 20 : 5,
            borderBottomRightRadius: isSender ? 5 : 20,
          },
        ]}
      >
        <Text
          style={[
            styles.text,
            { color: isSender ? '#000' : '#fff' },
          ]}
        >
          {message}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 6,
    marginHorizontal: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 6,
  },
  bubble: {
    maxWidth: '75%',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  text: {
    fontSize: 15,
  },
});
