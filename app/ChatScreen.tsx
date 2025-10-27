import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, // 👈 import đúng
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BlockModal from '@/components/chat/BlockModal'; // 👈 modal riêng
import ChatArea from '@/components/chat/ChatArea';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatInput from '@/components/chat/ChatInput';
import UnblockBlockModal from '@/components/chat/UnblockModal';


export default function ChatScreen() {
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [showUnblockModal, setShowUnblockModal] = useState(false);

  const router = useRouter();
  const { id, name, avatar } = useLocalSearchParams();

  const handleGoBack = () => {
    router.push('/(tabs)/chat'); // hoặc router.replace('/(tabs)/chat');
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* HEADER */}
        <ChatHeader
          isBlocked={isBlocked}
          onInfoPress={() => setShowBlockModal(true)}
          onBackPress={handleGoBack}
        />


        {/* KHU VỰC CHAT */}
        <ChatArea />

        {/* INPUT */}
        {isBlocked ? (
          <View style={styles.blockedContainer}>
            <Text style={styles.blockedText}>This user is currently blocked</Text>
            <TouchableOpacity onPress={() => setShowUnblockModal(true)}>
              <Text style={styles.unblockText}>Would you like to unblock them ?</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ChatInput />
        )}

        {/* MODAL BLOCK USER */}
        <BlockModal
          visible={showBlockModal}
          onClose={() => setShowBlockModal(false)}
          onConfirm={() => {
            // TODO: xử lý block user
            setShowBlockModal(false);
            setIsBlocked(true);
          }}
        />

        <UnblockBlockModal
          visible={showUnblockModal}
          onClose={() => setShowUnblockModal(false)}
          onConfirm={() => {
            setShowUnblockModal(false);
            setIsBlocked(false); // 👈 unblocked thành công
          }}
        />

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
  },
  blockedContainer: {
    backgroundColor: 'white',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderColor: '#ccc',
  },
  blockedText: {
    fontWeight: '600',
    fontSize: 14,
    color: 'black',
  },
  unblockText: {
    marginTop: 4,
    color: 'blue',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
