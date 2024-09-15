import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Pressable,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

export default function TapBox() {
  const pan = useRef(new Animated.Value(0)).current;
  const { width } = Dimensions.get('window');

  // Set left and right boundaries
  const LEFT_BOUNDARY = -(width / 2 - 50); // Move all the way to the left
  const RIGHT_BOUNDARY = width / 2 - 50; // Move all the way to the right

  // State to keep track of the box's current position
  const [isOnRight, setIsOnRight] = useState(false);

  // Function to handle tap gestures
  const handleTap = (event: any) => {
    const tapX = event.nativeEvent.locationX;

    // Logic to check if box is on the opposite side
    if (tapX < width / 2 && isOnRight) {
      // Tap on the left side, move to the left if box is currently on the right
      moveBox(LEFT_BOUNDARY);
      setIsOnRight(false); // Update state to reflect box is now on the left
    } else if (tapX >= width / 2 && !isOnRight) {
      // Tap on the right side, move to the right if box is currently on the left
      moveBox(RIGHT_BOUNDARY);
      setIsOnRight(true); // Update state to reflect box is now on the right
    }
  };

  // Function to move the box to a specific position
  const moveBox = (toValue: any) => {
    Animated.spring(pan, {
      toValue,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Touchable area for tap gestures */}
      <TouchableWithoutFeedback onPress={handleTap}>
        <View style={styles.fullScreen} />
      </TouchableWithoutFeedback>
      {/* Animated box */}
      <Animated.View
        style={[styles.box, { transform: [{ translateX: pan }] }]}
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
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    marginTop: 20,
  },
});
