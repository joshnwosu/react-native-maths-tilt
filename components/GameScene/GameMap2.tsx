import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Animated,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const blockSize = screenWidth / 10; // Define block size for road and movement

const cellSize = 150 / 3;

const GameMap: React.FC = () => {
  // Initial car position inside the maze (centered within the grid)
  const [carPosition, setCarPosition] = useState({
    x: blockSize * 1,
    y: blockSize * 3,
  });

  const carSpeed = blockSize; // Car moves by one block size at a time
  const [moving, setMoving] = useState<string | null>(null); // Track which direction is being pressed
  const moveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  // Maze road structure as an array of valid (x, y) coordinates
  const roadBlocks = [
    { x: blockSize * 0, y: blockSize * 3 },
    { x: blockSize * 1, y: blockSize * 3 },

    { x: blockSize * 2, y: blockSize * 0 },
    { x: blockSize * 2, y: blockSize * 1 },
    { x: blockSize * 2, y: blockSize * 2 },
    { x: blockSize * 2, y: blockSize * 3 },

    { x: blockSize * 3, y: blockSize * 3 },

    { x: blockSize * 4, y: blockSize * 3 },
    { x: blockSize * 5, y: blockSize * 3 },
    { x: blockSize * 5, y: blockSize * 4 },
    { x: blockSize * 5, y: blockSize * 5 },
    { x: blockSize * 5, y: blockSize * 6 },
    { x: blockSize * 4, y: blockSize * 6 },
    { x: blockSize * 3, y: blockSize * 6 },
    { x: blockSize * 2, y: blockSize * 6 },
    { x: blockSize * 2, y: blockSize * 7 },
    { x: blockSize * 2, y: blockSize * 8 },
    { x: blockSize * 2, y: blockSize * 9 },
  ];

  // Function to check if the new position is within the road blocks
  const isWithinRoad = (newX: number, newY: number): boolean => {
    // Round the coordinates to avoid floating-point precision issues
    const roundedX = Math.round(newX / blockSize) * blockSize;
    const roundedY = Math.round(newY / blockSize) * blockSize;

    return roadBlocks.some(
      (block) => block.x === roundedX && block.y === roundedY
    );
  };

  const isCurrentBlock = (
    block: { x: number; y: number },
    carPos: { x: number; y: number }
  ) => {
    // Round the coordinates to avoid floating-point precision issues
    const roundedBlockX = Math.round(block.x / blockSize) * blockSize;
    const roundedBlockY = Math.round(block.y / blockSize) * blockSize;
    const roundedCarX = Math.round(carPos.x / blockSize) * blockSize;
    const roundedCarY = Math.round(carPos.y / blockSize) * blockSize;

    return roundedBlockX === roundedCarX && roundedBlockY === roundedCarY;
  };

  // Function to move the car based on joystick input
  const moveCar = (direction: string) => {
    let newX = carPosition.x;
    let newY = carPosition.y;

    switch (direction) {
      case 'left':
        newX = carPosition.x - carSpeed;
        break;
      case 'right':
        newX = carPosition.x + carSpeed;
        break;
      case 'up':
        newY = carPosition.y - carSpeed;
        break;
      case 'down':
        newY = carPosition.y + carSpeed;
        break;
    }

    if (isWithinRoad(newX, newY)) {
      setCarPosition({ x: newX, y: newY });
    }
  };

  const startMoving = (direction: string) => {
    setMoving(direction);
    moveIntervalRef.current = setInterval(() => {
      moveCar(direction);
    }, 100); // Adjust the interval timing as needed
  };

  const stopMoving = () => {
    setMoving(null);
    if (moveIntervalRef.current) {
      clearInterval(moveIntervalRef.current);
      moveIntervalRef.current = null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Maze (Road) */}
      <View style={styles.mazeContainer}>
        {roadBlocks.map((block, index) => {
          // Check if the current block matches the car's position to highlight it
          // Check if the current block matches the car's position to highlight it
          const isHighlighted = isCurrentBlock(block, carPosition);

          return (
            <View
              key={index}
              style={[
                styles.roadBlock,
                {
                  left: block.x,
                  top: block.y,
                  width: blockSize,
                  height: blockSize,
                },
                isHighlighted ? styles.highlightedBlock : {}, // Apply highlight if it's the current block
              ]}
            />
          );
        })}

        {/* Car (Red Dot) */}
        <View
          style={[
            styles.car,
            {
              left: carPosition.x + blockSize / 4,
              top: carPosition.y + blockSize / 4,
              width: blockSize / 2,
              height: blockSize / 2,
            },
          ]}
        />
      </View>

      {/* Controls */}

      <View style={styles.gridContainer}>
        {Array.from({ length: 3 }).map((_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {Array.from({ length: 3 }).map((_, colIndex) => (
              <View key={colIndex} style={styles.gridItem}>
                <Text style={styles.gridText}>
                  {rowIndex * 3 + colIndex + 1}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.boxcontainer}>
        <TouchableOpacity
          style={[styles.box, styles.topCenter]}
          onPress={() => moveCar('up')}
        >
          <Ionicons name='arrow-up-outline' size={30} color={'#ffffff'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, styles.leftCenter]}
          onPress={() => moveCar('left')}
        >
          <Ionicons name='arrow-back-outline' size={30} color={'#ffffff'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, styles.bottomCenter]}
          onPress={() => moveCar('down')}
        >
          <Ionicons name='arrow-down-outline' size={30} color={'#ffffff'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, styles.rightCenter]}
          onPress={() => moveCar('right')}
        >
          <Ionicons name='arrow-forward-outline' size={30} color={'#ffffff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
  },
  mazeContainer: {
    position: 'relative',
    width: screenWidth,
    height: screenHeight / 2,
    backgroundColor: '#b0c4de',
  },
  roadBlock: {
    position: 'absolute',
    backgroundColor: '#333',
    borderWidth: 2,
    borderColor: '#b0c4de',
  },
  highlightedBlock: {
    backgroundColor: '#ffffff', // Highlight the current block (orange color)
  },
  car: {
    position: 'absolute',
    backgroundColor: '#4CAF50' || 'red',
    borderRadius: blockSize / 4, // Adjusted for better visuals
  },

  gridContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  gridItem: {
    width: cellSize,
    height: cellSize,
    backgroundColor: '#4CAF50',
    margin: 1, // Margin between grid items
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridText: {
    color: '#fff',
    fontSize: 20,
  },

  boxcontainer: {
    width: 200, // Set the width of the parent container
    aspectRatio: 1, // Set the height of the parent container
    position: 'absolute', // Make sure the container is relative for absolute positioning
    backgroundColor: '#f0f0f0', // Background color to visualize the container
    bottom: 10,
    left: 10,
  },

  box: {
    width: '33.33%', // Each box is 1/3 of the container's width
    height: '33.33%', // Each box is 1/3 of the container's height
    backgroundColor: '#4CAF50', // Background color of the boxes
    position: 'absolute', // Absolute positioning for precise placement

    justifyContent: 'center',
    alignItems: 'center',
  },
  topCenter: {
    top: 0,
    left: '50%',
    width: '33.33%', // Ensure box width is correct
    height: '33.33%', // Ensure box height is correct
    transform: [{ translateX: -((200 * 0.33) / 2) }], // Center horizontally
  },
  leftCenter: {
    top: '50%',
    left: 0,
    width: '33.33%', // Ensure box width is correct
    height: '33.33%', // Ensure box height is correct
    transform: [{ translateY: -((200 * 0.33) / 2) }], // Center vertically
  },
  bottomCenter: {
    bottom: 0,
    left: '50%',
    width: '33.33%', // Ensure box width is correct
    height: '33.33%', // Ensure box height is correct
    transform: [{ translateX: -((200 * 0.33) / 2) }], // Center horizontally
  },
  rightCenter: {
    top: '50%',
    right: 0,
    width: '33.33%', // Ensure box width is correct
    height: '33.33%', // Ensure box height is correct
    transform: [{ translateY: -((200 * 0.33) / 2) }], // Center vertically
  },
});

export default GameMap;
