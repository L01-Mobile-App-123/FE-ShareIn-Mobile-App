import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function ChatHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/100?img=3' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Gia Nguyễn</Text>
      </View>

      <View style={styles.icons}>
        <Ionicons name="call-outline" size={22} color="#000" style={styles.icon} />
        <Ionicons name="videocam-outline" size={22} color="#000" style={styles.icon} />
        <Ionicons name="information-circle-outline" size={22} color="#000" />
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
  left: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  name: { fontWeight: '700', fontSize: 16 },
  icons: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginLeft: 15 },
});
