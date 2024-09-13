import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function Tilt() {
  return (
    <ThemedView style={styles.container}>
      <Link href='/tilt/gyroscope'>
        <ThemedText>To to Tilt Gyroscope</ThemedText>
      </Link>
      <Link href='/tilt/direction'>
        <ThemedText>To to Tilt Direction</ThemedText>
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
