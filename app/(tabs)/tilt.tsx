import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

export default function TiltScreen() {
  return (
    <ThemedView style={styles.container}>
      <Link href='/gyroscope' asChild>
        <Pressable>
          <ThemedText>To to Tilt Gyroscope</ThemedText>
        </Pressable>
      </Link>
      <Link href='/direction' asChild>
        <Pressable>
          <ThemedText>To to Tilt Direction</ThemedText>
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
