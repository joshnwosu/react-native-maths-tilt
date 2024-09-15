import ParallaxScrollView from '@/components/ParallaxScrollView';
import Card from '@/components/Shared/Card/Card';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image, Pressable, StyleSheet, Text } from 'react-native';

export default function Tilt() {
  const options = ['Inbox', 'Folders', 'Notifications', 'Settings', 'Trash'];

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

        <Card>
          {options.map((item, index) => (
            <Pressable
              key={index.toString()}
              onPress={() => console.log(item)}
              className='text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100'
            >
              <ThemedText>{item}</ThemedText>
            </Pressable>
          ))}
        </Card>

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
