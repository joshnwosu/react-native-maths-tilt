import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{ title: 'Tilt', headerShown: false }}
      />
      <Stack.Screen name='gyroscope' options={{ title: 'Gyroscope' }} />
      <Stack.Screen name='direction' options={{ title: 'Direction' }} />
    </Stack>
  );
}
