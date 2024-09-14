// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { Accelerometer } from 'expo-sensors';
// import { useEffect, useState } from 'react';
// import { Animated, StyleSheet, Dimensions } from 'react-native';

// export default function Tilt() {
//   const [xPosition, setXPosition] = useState(new Animated.Value(0));
//   const [subscription, setSubscription] = useState<any>(null);

//   // Get screen width to calculate boundaries
//   const { width } = Dimensions.get('window');
//   const boxWidth = 50; // Width of the box in px
//   const halfScreenWidth = width / 2;
//   const limit = halfScreenWidth - boxWidth / 2; // Limit the movement to half screen minus half the box size

//   const tiltSensitivity = 0.1; // Adjust this value to control how sensitive it is to tilts

//   const subscribe = () => {
//     setSubscription(
//       Accelerometer.addListener(({ x }) => {
//         if (x > tiltSensitivity) {
//           moveObject('right');
//         } else if (x < -tiltSensitivity) {
//           moveObject('left');
//         }
//       })
//     );
//     Accelerometer.setUpdateInterval(100);
//   };

//   const unsubscribe = () => {
//     subscription && subscription.remove();
//     setSubscription(null);
//   };

//   useEffect(() => {
//     subscribe();
//     return () => unsubscribe();
//   }, []);

//   const moveObject = (direction: 'left' | 'right') => {
//     let targetX = 0;

//     // Determine the direction and set the target X position
//     xPosition.stopAnimation((currentX) => {
//       if (direction === 'left') {
//         targetX = Math.max(currentX - 50, -limit); // Move left by 50 units, clamp to the limit
//       } else if (direction === 'right') {
//         targetX = Math.min(currentX + 50, limit); // Move right by 50 units, clamp to the limit
//       }

//       // Animate to the new target position
//       Animated.timing(xPosition, {
//         toValue: targetX,
//         duration: 200, // Adjust the speed of movement
//         useNativeDriver: true,
//       }).start();
//     });
//   };

//   return (
//     <ThemedView style={styles.container}>
//       <ThemedText style={styles.instructions}>
//         Tilt your phone to move the box left or right!
//       </ThemedText>
//       <Animated.View
//         style={[styles.box, { transform: [{ translateX: xPosition }] }]}
//       />
//     </ThemedView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   instructions: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
//   box: {
//     width: 50,
//     height: 50,
//     backgroundColor: 'blue',
//   },
// });

// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { Accelerometer } from 'expo-sensors';
// import { useEffect, useState } from 'react';
// import { Animated, StyleSheet, Dimensions } from 'react-native';

// export default function Tilt() {
//   const [xPosition, setXPosition] = useState(new Animated.Value(0));
//   const [subscription, setSubscription] = useState<any>(null);

//   // Get screen width to calculate boundaries
//   const { width } = Dimensions.get('window');
//   const boxWidth = 50; // Width of the box in px
//   const halfScreenWidth = width / 2;
//   const limit = halfScreenWidth - boxWidth / 2; // Limit the movement to half screen minus half the box size

//   const leftTiltThreshold = -0.5; // Extreme left tilt threshold
//   const rightTiltThreshold = 0.5; // Extreme right tilt threshold

//   const subscribe = () => {
//     setSubscription(
//       Accelerometer.addListener(({ x }) => {
//         // If tilt is extreme left or right, move the box
//         if (x > rightTiltThreshold) {
//           moveObject('right');
//         } else if (x < leftTiltThreshold) {
//           moveObject('left');
//         }
//         // Do nothing if tilt is in the middle (dead zone)
//       })
//     );
//     Accelerometer.setUpdateInterval(100);
//   };

//   const unsubscribe = () => {
//     subscription && subscription.remove();
//     setSubscription(null);
//   };

//   useEffect(() => {
//     subscribe();
//     return () => unsubscribe();
//   }, []);

//   const moveObject = (direction: 'left' | 'right') => {
//     let targetX = 0;

//     // Determine the direction and set the target X position
//     xPosition.stopAnimation((currentX) => {
//       if (direction === 'left') {
//         targetX = Math.max(currentX - 100, -limit); // Move left by 100 units, clamp to the limit
//       } else if (direction === 'right') {
//         targetX = Math.min(currentX + 100, limit); // Move right by 100 units, clamp to the limit
//       }

//       // Animate to the new target position
//       Animated.timing(xPosition, {
//         toValue: targetX,
//         duration: 200, // Adjust the speed of movement
//         useNativeDriver: true,
//       }).start();
//     });
//   };

//   return (
//     <ThemedView style={styles.container}>
//       <ThemedText style={styles.instructions}>
//         Tilt your phone far left or far right to move the box!
//       </ThemedText>
//       <Animated.View
//         style={[styles.box, { transform: [{ translateX: xPosition }] }]}
//       />
//     </ThemedView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   instructions: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
//   box: {
//     width: 50,
//     height: 50,
//     backgroundColor: 'blue',
//   },
// });

// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { Accelerometer } from 'expo-sensors';
// import { useEffect, useState } from 'react';
// import { Animated, StyleSheet, Dimensions } from 'react-native';

// export default function Tilt() {
//   const [xPosition, setXPosition] = useState(new Animated.Value(0));
//   const [subscription, setSubscription] = useState<any>(null);

//   // Get screen width to calculate boundaries
//   const { width } = Dimensions.get('window');
//   const boxWidth = 50; // Width of the box in px
//   const halfScreenWidth = width / 2;
//   const limit = halfScreenWidth - boxWidth / 2; // Limit the movement to half screen minus half the box size

//   const leftTiltThreshold = 0.5; // Extreme left tilt threshold (inverted)
//   const rightTiltThreshold = -0.5; // Extreme right tilt threshold (inverted)

//   const subscribe = () => {
//     setSubscription(
//       Accelerometer.addListener(({ x }) => {
//         // Invert the direction to match the physical tilt
//         if (x > leftTiltThreshold) {
//           moveObject('left');
//         } else if (x < rightTiltThreshold) {
//           moveObject('right');
//         }
//       })
//     );
//     Accelerometer.setUpdateInterval(100);
//   };

//   const unsubscribe = () => {
//     subscription && subscription.remove();
//     setSubscription(null);
//   };

//   useEffect(() => {
//     subscribe();
//     return () => unsubscribe();
//   }, []);

//   const moveObject = (direction: 'left' | 'right') => {
//     let targetX = 0;

//     // Determine the direction and set the target X position
//     xPosition.stopAnimation((currentX) => {
//       if (direction === 'left') {
//         targetX = Math.max(currentX - 50, -limit); // Move left by 150 units, clamp to the limit
//       } else if (direction === 'right') {
//         targetX = Math.min(currentX + 50, limit); // Move right by 150 units, clamp to the limit
//       }

//       // Animate to the new target position with a faster duration
//       // Animated.timing(xPosition, {
//       //   toValue: targetX,
//       //   duration: 100, // Make movement faster
//       //   delay: 0,
//       //   useNativeDriver: true,
//       // }).start();

//       Animated.spring(xPosition, {
//         toValue: targetX,
//         friction: 5, // Control the smoothness (lower = more bouncy, higher = smoother)
//         tension: 60, // Control the stiffness of the spring (higher = faster movement)
//         useNativeDriver: true,
//       }).start();
//     });
//   };

//   return (
//     <ThemedView style={styles.container}>
//       <ThemedText style={styles.instructions}>
//         Tilt your phone far left or far right to move the box!
//       </ThemedText>
//       <Animated.View
//         style={[styles.box, { transform: [{ translateX: xPosition }] }]}
//       />
//     </ThemedView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   instructions: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
//   box: {
//     width: 50,
//     height: 50,
//     backgroundColor: 'blue',
//   },
// });

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Accelerometer } from 'expo-sensors';
import { useEffect, useState } from 'react';
import { Animated, StyleSheet, Dimensions } from 'react-native';

export default function DirectionScreen() {
  const [xPosition, setXPosition] = useState(new Animated.Value(0));
  const [subscription, setSubscription] = useState<any>(null);

  // Get screen width to calculate boundaries
  const { width } = Dimensions.get('window');
  const boxWidth = 50; // Width of the box in px
  const halfScreenWidth = width / 2;
  const limit = halfScreenWidth - boxWidth / 2; // Limit for left/right positions

  const leftTiltThreshold = 0.5; // Detect a significant tilt to the left
  const rightTiltThreshold = -0.5; // Detect a significant tilt to the right

  // Subscribe to accelerometer data
  const subscribe = () => {
    setSubscription(
      Accelerometer.addListener(({ x }) => {
        // Invert the direction so tilting left moves left, and tilting right moves right
        if (x > leftTiltThreshold) {
          moveObject('left');
        } else if (x < rightTiltThreshold) {
          moveObject('right');
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

  const moveObject = (direction: 'left' | 'right') => {
    let targetX = 0;

    // Move fully to the left or right based on the direction detected
    if (direction === 'left') {
      targetX = -limit; // Move to the far left
    } else if (direction === 'right') {
      targetX = limit; // Move to the far right
    }

    // Use spring animation for smooth and complete transition to the new position
    Animated.spring(xPosition, {
      toValue: targetX,
      friction: 5,
      tension: 60,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.instructions}>
        Tilt your phone far left or far right to move the box fully in that
        direction!
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
    backgroundColor: 'blue',
  },
});
