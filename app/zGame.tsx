import React from 'react';
import GameMap from '@/components/GameScene/GameMap';
import { GameBoard } from '@/components/SnakeGame/GameBoard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function zGame() {
  return (
    <>
      {!true ? (
        <GameMap />
      ) : (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <GameBoard />
        </GestureHandlerRootView>
      )}
    </>
  );
}
