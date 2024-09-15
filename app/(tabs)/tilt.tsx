import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

export default function TiltScreen() {
  return (
    <ThemedView style={styles.container}>
      <Link href='/gyroscope' asChild>
        <Pressable>
          <ThemedText>Go to Tilt Gyroscope</ThemedText>
        </Pressable>
      </Link>
      <Link href='/direction' asChild>
        <Pressable>
          <ThemedText>Go to Tilt Direction</ThemedText>
        </Pressable>
      </Link>
      <Link href='/swipe' asChild>
        <Pressable>
          <ThemedText>Go to Tilt Swipe</ThemedText>
        </Pressable>
      </Link>
      <Link href='/tap' asChild>
        <Pressable>
          <ThemedText>Go to Tilt Tap</ThemedText>
        </Pressable>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
