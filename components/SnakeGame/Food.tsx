// Food.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

type FoodProps = {
  position: { x: number; y: number };
};

export const Food: React.FC<FoodProps> = ({ position }) => {
  return (
    <View
      style={[styles.food, { top: position.y * 20, left: position.x * 20 }]}
    />
  );
};

const styles = StyleSheet.create({
  food: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    position: 'absolute',
  },
});
