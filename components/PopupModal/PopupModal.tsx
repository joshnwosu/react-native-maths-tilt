import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';

interface PopupModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

const PopupModal: React.FC<PopupModalProps> = ({
  visible,
  onClose,
  title,
  children,
}) => {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <ThemedView style={styles.modalWrapper}>
          <View style={styles.header}>
            {title && (
              <ThemedText style={styles.modalTitle}>{title}</ThemedText>
            )}

            <Pressable style={styles.closeButton} onPress={onClose}>
              <ThemedText>
                <Ionicons name='close-outline' size={20} />
              </ThemedText>
            </Pressable>
          </View>

          <View style={styles.modalContent}>{children}</View>
        </ThemedView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    width: '100%',
    // borderBottomWidth: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalWrapper: {
    width: 300,
    borderRadius: 10,
  },
  modalContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {},
  closeText: {
    color: 'white',
    fontSize: 16,
  },
});

export default PopupModal;
