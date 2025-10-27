import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface BlockModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function BlockModal({ visible, onClose, onConfirm }: BlockModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.dialogBox}>
          <Text style={styles.title}>DO YOU WANT TO BLOCK THIS USER ?</Text>

          <TouchableOpacity style={[styles.button, styles.yesButton]} onPress={onConfirm}>
            <Text style={styles.buttonText}>YES</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.noButton]} onPress={onClose}>
            <Text style={styles.buttonText}>NO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 25,
    alignItems: 'center',
    width: 250,
  },
  title: {
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 15,
  },
  button: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  yesButton: { backgroundColor: '#E53935' },
  noButton: { backgroundColor: '#ddd' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
