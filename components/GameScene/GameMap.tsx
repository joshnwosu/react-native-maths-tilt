import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { createGrid, generateMaze, getMazeRoadBlocks } from './util';
import { ThemedText } from '../ThemedText';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const mazeGridSize = 11; // Odd numbers for better maze generation - please do not go below 7
const blockSize = screenWidth / mazeGridSize; // Define block size for road and movement
const mazeContainerHeight = blockSize * mazeGridSize;
const minDistance = 200; // Minimum distance between red and blue dots

// Helper function to calculate distance
const calculateDistance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

// Function to get a random position from the road blocks
const getRandomRoadBlock = (roadBlocks: { x: number; y: number }[]) => {
  const randomIndex = Math.floor(Math.random() * roadBlocks.length);
  return roadBlocks[randomIndex];
};

const GameMap: React.FC = () => {
  // Initial car position inside the maze (centered within the grid)
  const [redDotPosition, setRedDotPosition] = useState({
    x: blockSize * 1,
    y: blockSize * 1,
  });
  const [blueDotPosition, setBlueDotPosition] = useState({
    x: 0,
    y: 0,
  });

  const [roadBlocks, setRoadBlocks] = useState<{ x: number; y: number }[]>([]);
  const [moves, setMoves] = useState(0);

  const resetGame = () => {
    setMoves(0);

    const width = mazeGridSize;
    const height = mazeGridSize;
    const grid = createGrid(width, height);

    generateMaze(grid, 1, 1);
    const roadPath = getMazeRoadBlocks(grid, blockSize);
    setRoadBlocks(roadPath);

    // Place the red dot randomly within the road blocks
    const redDot = getRandomRoadBlock(roadPath);
    setRedDotPosition(redDot);

    // Place the blue dot far away from the red dot within the road blocks
    let blueDot = getRandomRoadBlock(roadPath);
    while (
      calculateDistance(redDot.x, redDot.y, blueDot.x, blueDot.y) < minDistance
    ) {
      blueDot = getRandomRoadBlock(roadPath); // Keep re-rolling until far enough
    }
    setBlueDotPosition(blueDot);
  };

  useEffect(() => {
    resetGame();
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
    const roundedBlockX = Math.round(block.x / blockSize) * blockSize;
    const roundedBlockY = Math.round(block.y / blockSize) * blockSize;
    const roundedCarX = Math.round(carPos.x / blockSize) * blockSize;
    const roundedCarY = Math.round(carPos.y / blockSize) * blockSize;

    return roundedBlockX === roundedCarX && roundedBlockY === roundedCarY;
  };

  // Function to check if red and blue dots are on the same block
  const checkCollision = (newPosition: { x: number; y: number }) => {
    const redX = Math.round(newPosition.x / blockSize) * blockSize;
    const redY = Math.round(newPosition.y / blockSize) * blockSize;
    const blueX = Math.round(blueDotPosition.x / blockSize) * blockSize;
    const blueY = Math.round(blueDotPosition.y / blockSize) * blockSize;

    return redX === blueX && redY === blueY;
  };

  const moveDot = (direction: string) => {
    let newX = redDotPosition.x;
    let newY = redDotPosition.y;

    switch (direction) {
      case 'left':
        newX -= blockSize;
        break;
      case 'right':
        newX += blockSize;
        break;
      case 'up':
        newY -= blockSize;
        break;
      case 'down':
        newY += blockSize;
        break;
    }

    if (isWithinRoad(newX, newY)) {
      const newPosition = { x: newX, y: newY };

      // Check collision before updating the position
      if (checkCollision(newPosition)) {
        alert(`Game Over! Final Score: ${moves + 1}`);
        resetGame(); // Reset immediately on collision
      } else {
        setRedDotPosition(newPosition);
        setMoves((prevScore) => prevScore + 1);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/bg/grass1.jpg')}
        style={{
          width: '100%',
          height: mazeContainerHeight,
          marginBottom: blockSize / 2,
        }}
        resizeMode='cover'
      >
        {/* Maze (Road) */}
        <View style={styles.mazeContainer}>
          {roadBlocks.map((block, index) => {
            const isHighlighted = isCurrentBlock(block, redDotPosition);

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
                    transform: [{ scale: 1.5 }],
                  },
                  isHighlighted ? styles.highlightedBlock : {},
                ]}
              />
            );
          })}

          {/* (Red Dot) */}
          <View
            style={[
              styles.dot,
              {
                left: redDotPosition.x,
                top: redDotPosition.y,
                backgroundColor: 'orangered',
              },
            ]}
          />

          {/* (Blue Dot) */}
          <View
            style={[
              styles.dot,
              {
                left: blueDotPosition.x,
                top: blueDotPosition.y,
                backgroundColor: 'skyblue',
              },
            ]}
          />
        </View>
      </ImageBackground>

      <ThemedText>MOVES: {moves}</ThemedText>

      {/* Controls */}

      <View style={styles.boxcontainer}>
        <TouchableOpacity
          style={[styles.box, styles.topCenter]}
          onPress={() => moveDot('up')}
        >
          <Ionicons name='arrow-up-outline' size={30} color={'#ffffff'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, styles.leftCenter]}
          onPress={() => moveDot('left')}
        >
          <Ionicons name='arrow-back-outline' size={30} color={'#ffffff'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, styles.bottomCenter]}
          onPress={() => moveDot('down')}
        >
          <Ionicons name='arrow-down-outline' size={30} color={'#ffffff'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, styles.rightCenter]}
          onPress={() => moveDot('right')}
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
    // backgroundColor: '#e0e0e0',
    alignItems: 'center',
  },
  mazeContainer: {
    position: 'relative',
    width: screenWidth,
    height: mazeContainerHeight,
  },
  roadBlock: {
    position: 'absolute',
    backgroundColor: '#111',
    borderRadius: 5,
  },
  highlightedBlock: {},
  dot: {
    width: blockSize,
    aspectRatio: 1,
    position: 'absolute',
    padding: 1,
    backgroundColor: 'white',
    borderRadius: blockSize,
  },
  boxcontainer: {
    width: 150,
    aspectRatio: 1,
    position: 'absolute',
    bottom: 10,
    left: 10,

    justifyContent: 'center',
    alignItems: 'center',
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
  },
  leftCenter: {
    left: 0,
  },
  bottomCenter: {
    bottom: 0,
  },
  rightCenter: {
    right: 0,
  },
});

export default GameMap;
