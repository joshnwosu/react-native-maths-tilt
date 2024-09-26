import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const laneWidth = width / 2; // Two lanes of equal width

const CarRace = () => {
  const [lane, setLane] = useState(1); // 1 for left lane, 2 for right lane
  const [obstaclePosition, setObstaclePosition] = useState(
    new Animated.Value(0)
  ); // For vertical movement of obstacles
  const [gameOver, setGameOver] = useState(false);

  // Handle swipe (left or right)
  const moveLeft = () => {
    if (lane > 1) setLane(lane - 1);
  };

  const moveRight = () => {
    if (lane < 2) setLane(lane + 1);
  };

  // Animate obstacles falling down
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(obstaclePosition, {
        toValue: height,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        setObstaclePosition(new Animated.Value(0)); // Reset position after reaching bottom
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Collision detection
  useEffect(() => {
    // Simplified collision detection based on lane and obstacle position
    if (lane === 1 && obstaclePosition._value > height - 100) {
      setGameOver(true);
    }
  }, [lane, obstaclePosition]);

  if (gameOver) {
    return (
      <View style={styles.gameOverContainer}>
        <Text style={styles.gameOverText}>Game Over</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Lanes */}
      <View style={styles.road}>
        <View style={[styles.lane, lane === 1 && styles.carLeftLane]}></View>
        <View style={[styles.lane, lane === 2 && styles.carRightLane]}></View>
      </View>

      {/* Car */}
      <View style={[styles.car, lane === 2 && styles.carRight]} />

      {/* Obstacle */}
      <Animated.View
        style={[
          styles.obstacle,
          { transform: [{ translateY: obstaclePosition }] },
        ]}
      />

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={moveLeft}>
          <Text style={styles.controlText}>Left</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={moveRight}>
          <Text style={styles.controlText}>Right</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
  },
  road: {
    flexDirection: 'row',
    width: '100%',
    height: '80%',
    position: 'relative',
  },
  lane: {
    width: laneWidth,
    height: '100%',
    borderColor: 'white',
    borderRightWidth: 2,
    backgroundColor: '#333',
  },
  car: {
    position: 'absolute',
    bottom: 100,
    width: laneWidth - 40,
    height: 60,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  carRight: {
    left: laneWidth, // Move the car to the second lane
  },
  obstacle: {
    position: 'absolute',
    top: 0,
    left: laneWidth / 2 - 20,
    width: 40,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    position: 'absolute',
    bottom: 20,
  },
  controlText: {
    fontSize: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  gameOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default CarRace;
