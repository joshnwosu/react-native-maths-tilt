import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Tilt() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/1914837/pexels-photo-1914837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          }}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView>
        <ThemedText>Tilt Example Start!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example!</ThemedText>
        <ThemedText>Tilt Example End!</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    width: '100%',
    height: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
    objectFit: 'cover',
  },
});
