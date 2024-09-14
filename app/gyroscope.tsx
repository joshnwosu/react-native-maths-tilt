import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Accelerometer } from 'expo-sensors';
import { useEffect, useState } from 'react';
import { Animated, StyleSheet, Dimensions } from 'react-native';

export default function GyroscopeScreen() {
  const [xPosition, setXPosition] = useState(new Animated.Value(0));
  const [subscription, setSubscription] = useState<any>(null);

  // Get screen width to calculate boundaries
  const { width } = Dimensions.get('window');
  const boxWidth = 50; // Width of the box in px
  const halfScreenWidth = width / 2;
  const limit = halfScreenWidth - boxWidth / 2; // Limit the movement to half screen minus half the box size

  let lastTiltX = 0; // To store the last value of tilt

  const subscribe = () => {
    setSubscription(
      Accelerometer.addListener(({ x }) => {
        const threshold = 0.02; // Sensitivity threshold to reduce frequent small updates
        if (Math.abs(x - lastTiltX) > threshold) {
          moveObject(x);
          lastTiltX = x; // Update the lastTiltX to the current value
        }
      })
    );

    Accelerometer.setUpdateInterval(100);
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, []);

  const moveObject = (tiltX: number) => {
    const scaledXPosition = -tiltX * 600; // Scale movement by tilt
    const clampedPosition = Math.max(-limit, Math.min(scaledXPosition, limit)); // Clamp the position within boundaries

    Animated.spring(xPosition, {
      toValue: clampedPosition, // Use clamped value for movement
      friction: 5, // Friction for smooth animation
      useNativeDriver: true,
    }).start();
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.instructions}>
        Tilt your phone to move the box left or right!
      </ThemedText>
      <Animated.View
        style={[styles.box, { transform: [{ translateX: xPosition }] }]}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    fontSize: 18,
    marginBottom: 20,
  },
  box: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'blue',
  },
});
