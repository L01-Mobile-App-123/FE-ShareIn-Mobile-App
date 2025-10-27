import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ChatHeaderProps {
  onInfoPress: () => void;
  isBlocked: boolean;
  onBackPress?: () => void;
}

export default function ChatHeader({ onInfoPress, isBlocked, onBackPress }: ChatHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leftGroup}>
        <TouchableOpacity onPress={onBackPress}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Image
          source={{ uri: 'https://i.pravatar.cc/100?img=3' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Gia Nguyên</Text>
      </View>

      <View style={styles.rightGroup}>
        <Ionicons name="call-outline" size={22} color="#000" />
        {/* <Ionicons name="videocam-outline" size={22} color="#000" /> */}
        {!isBlocked && (
          <TouchableOpacity onPress={onInfoPress}>
            <Ionicons name="information-circle-outline" size={22} color="#000" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDD835',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  leftGroup: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rightGroup: { flexDirection: 'row', alignItems: 'center', gap: 18 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  name: { fontWeight: '700', fontSize: 16 },
});
