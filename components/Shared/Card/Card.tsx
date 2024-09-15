import { View, Text } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface CardProps {
  children: any;
}

export default function Card({ children }: CardProps) {
  const colorScheme = useColorScheme();
  const cardColor = Colors[colorScheme ?? 'light'];

  return (
    <View
      className={`w-full relative flex flex-col rounded-lg bg-[${cardColor.background}] shadow-sm border border-slate-200 my-4 p-2`}
    >
      {children}
    </View>
  );
}
