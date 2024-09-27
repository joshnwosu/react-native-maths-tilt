import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Alert, StyleSheet, Dimensions } from 'react-native';
import { Snake } from './Snake';
import { Food } from './Food';
import { PanGestureHandler } from 'react-native-gesture-handler';

// Dynamically get screen width and height
const { width, height } = Dimensions.get('window');

// Define the board size based on the screen width and height
const TILE_SIZE = 20; // Size of each grid tile
const BOARD_WIDTH = Math.floor(width / TILE_SIZE);
const BOARD_HEIGHT = Math.floor(height / TILE_SIZE);

// Generate random food position within the game board
const getRandomPosition = () => {
  const x = Math.floor(Math.random() * BOARD_WIDTH);
  const y = Math.floor(Math.random() * BOARD_HEIGHT);
  return { x, y };
};

export const GameBoard: React.FC = () => {
  const [snake, setSnake] = useState([{ x: 5, y: 5 }]);
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [food, setFood] = useState(getRandomPosition());
  const [isGameOver, setIsGameOver] = useState(false);

  const gameInterval = useRef<any>(null);

  useEffect(() => {
    if (!isGameOver) {
      gameInterval.current = setInterval(moveSnake, 200);
    }
    return () => clearInterval(gameInterval.current);
  }, [snake]);

  const moveSnake = () => {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Debugging: Log snake head position
    console.log(`Snake Head Position: (${head.x}, ${head.y})`);

    if (isCollision(head)) {
      gameOver();
      return;
    }

    const newSnake = [head, ...snake];
    if (head.x === food.x && head.y === food.y) {
      setFood(getRandomPosition());
    } else {
      newSnake.pop(); // Remove tail
    }
    setSnake(newSnake);
  };

  const isCollision = (head: { x: number; y: number }) => {
    // Check if head is out of bounds
    if (
      head.x < 0 ||
      head.x >= BOARD_WIDTH || // Now using dynamic board width
      head.y < 0 ||
      head.y >= BOARD_HEIGHT // Now using dynamic board height
    ) {
      console.log('Collision with wall');
      return true;
    }

    // Check if head collides with the body
    return snake.some(
      (segment) => segment.x === head.x && segment.y === head.y
    );
  };

  const changeDirection = (newDirection: { x: number; y: number }) => {
    setDirection(newDirection);
  };

  const gameOver = () => {
    clearInterval(gameInterval.current);
    setIsGameOver(true);
    Alert.alert('Game Over', 'Try Again?', [
      { text: 'OK', onPress: resetGame },
    ]);
  };

  const resetGame = () => {
    setSnake([{ x: 5, y: 5 }]);
    setDirection({ x: 1, y: 0 });
    setFood(getRandomPosition());
    setIsGameOver(false);
  };

  const handleSwipe = ({ nativeEvent }: any) => {
    const { translationX, translationY } = nativeEvent;
    if (Math.abs(translationX) > Math.abs(translationY)) {
      changeDirection({ x: translationX > 0 ? 1 : -1, y: 0 });
    } else {
      changeDirection({ x: 0, y: translationY > 0 ? 1 : -1 });
    }
  };

  return (
    <PanGestureHandler onGestureEvent={handleSwipe}>
      <View style={styles.container}>
        <Snake snakePosition={snake} />
        <Food position={food} />
        {isGameOver && <Button title='Restart' onPress={resetGame} />}
      </View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    position: 'relative',
    width: '100%',
    height: '100%',
    // borderWidth: 10,
    // borderColor: 'red',
  },
});
