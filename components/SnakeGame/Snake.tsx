// Snake.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

type SnakeProps = {
  snakePosition: { x: number; y: number }[];
};

export const Snake: React.FC<SnakeProps> = ({ snakePosition }) => {
  return (
    <>
      {snakePosition.map((segment, index) => (
        <View
          key={index}
          style={[
            styles.snakeSegment,
            { top: segment.y * 20, left: segment.x * 20 },
          ]}
        />
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  snakeSegment: {
    width: 20,
    height: 20,
    backgroundColor: 'green',
    position: 'absolute',
  },
});
