import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Animated, PanResponder, Button } from 'react-native';

export default function SwipeBox() {
  // Create an animated value for the X-axis (horizontal movement)
  const pan = useRef(new Animated.Value(0)).current;

  // Define the movement boundaries
  const LEFT_BOUNDARY = -150;
  const RIGHT_BOUNDARY = 150;

  // State to toggle restricted movement
  const [isRestricted, setIsRestricted] = useState(true);
  const isRestrictedRef = useRef(isRestricted); // Reference to hold the restriction state

  // Update ref value when isRestricted state changes
  useEffect(() => {
    isRestrictedRef.current = isRestricted;
  }, [isRestricted]);

  // Toggle restricted movement function
  const toggleRestriction = () => {
    setIsRestricted((prev) => !prev);
  };

  // Create the PanResponder to handle gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      // Handling movement on the screen (dragging/swiping)
      onPanResponderMove: (event, gestureState) => {
        const { dx } = gestureState;

        // Check restriction using the ref instead of state directly
        if (isRestrictedRef.current) {
          if (dx >= LEFT_BOUNDARY && dx <= RIGHT_BOUNDARY) {
            pan.setValue(dx); // Move the box only if within boundaries
          }
        } else {
          pan.setValue(dx); // Move freely without boundaries
        }
      },

      // When the user lifts their finger off the screen
      onPanResponderRelease: () => {
        // Optionally, you can reset the box to the center after release
        Animated.spring(pan, {
          toValue: 0, // Reset to the center position
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      {/* Button to toggle restricted movement */}
      <Button
        title={isRestricted ? 'Disable Restriction' : 'Enable Restriction'}
        onPress={toggleRestriction}
      />

      {/* Animated box that responds to swipe gestures */}
      <Animated.View
        {...panResponder.panHandlers} // Attach the panResponder
        style={[
          styles.box,
          { transform: [{ translateX: pan }] }, // Translate the box horizontally
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    marginTop: 20,
  },
});
