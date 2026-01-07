import React from 'react';
import { Text } from 'react-native';

export default ({ testID, name }: any) => {
  // Mỗi Ionicons giả lập bằng <Text> với testID
  return <Text testID={testID || name}>{name}</Text>;
};
