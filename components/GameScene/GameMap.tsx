import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { createGrid, generateMaze, getMazeRoadBlocks } from './util';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const blockSize = screenWidth / 20; // Define block size for road and movement

const GameMap: React.FC = () => {
  // Initial car position inside the maze (centered within the grid)
  const [carPosition, setCarPosition] = useState({
    x: blockSize * 0,
    y: blockSize * 0,
  });

  const carSpeed = blockSize; // Car moves by one block size at a time

  // Use Animated values for smooth animation
  const translateX = useRef(new Animated.Value(carPosition.x)).current;
  const translateY = useRef(new Animated.Value(carPosition.y)).current;

  const [roadBlocks, setRoadBlocks] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const width = 19; // Odd numbers for better maze generation
    const height = 19; // Odd numbers work best for carving paths
    const grid = createGrid(width, height);

    // Start maze generation at (1, 1) for paths to work properly
    generateMaze(grid, 0, 0);
    const roadPath = getMazeRoadBlocks(grid, blockSize);
    setRoadBlocks(roadPath);
    // console.log('path: ', generateMaze(grid, 0, 0));
  }, []);

  // Function to check if the new position is within the road blocks
  const isWithinRoad = (newX: number, newY: number): boolean => {
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

  // Function to animate the car's movement
  const animateCar = (newX: number, newY: number) => {
    Animated.timing(translateX, {
      toValue: newX,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateY, {
      toValue: newY,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

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
      animateCar(newX, newY);
    }
  };

  return (
    <View style={styles.container}>
      {/* Maze (Road) */}
      <View style={styles.mazeContainer}>
        {roadBlocks.map((block, index) => {
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
                isHighlighted ? styles.highlightedBlock : {},
              ]}
            />
          );
        })}

        {/* Car (Red Dot) */}
        <Animated.View
          style={[
            styles.car,
            {
              transform: [{ translateX }, { translateY }],
              top: blockSize / 4,
              left: blockSize / 4,
              width: blockSize / 2,
              height: blockSize / 2,
            },
          ]}
        />
      </View>

      {/* Controls */}
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
    borderWidth: 1,
    borderColor: '#b0c4de',
  },
  highlightedBlock: {
    // backgroundColor: '#ffffff',
  },
  car: {
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: blockSize / 4, // Adjusted for better visuals
  },
  boxcontainer: {
    width: 200,
    aspectRatio: 1,
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  box: {
    width: '33.33%',
    height: '33.33%',
    backgroundColor: '#4CAF50',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topCenter: {
    top: 0,
    left: '50%',
    transform: [{ translateX: -33.33 }],
  },
  leftCenter: {
    top: '50%',
    left: 0,
    transform: [{ translateY: -33.33 }],
  },
  bottomCenter: {
    bottom: 0,
    left: '50%',
    transform: [{ translateX: -33.33 }],
  },
  rightCenter: {
    top: '50%',
    right: 0,
    transform: [{ translateY: -33.33 }],
  },
});

export default GameMap;
