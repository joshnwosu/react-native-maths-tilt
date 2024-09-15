import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function Tilt() {
  const router = useRouter();
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

        <View className='relative flex flex-col rounded-lg bg-white shadow-sm border border-slate-200 my-4'>
          <View className='flex min-w-[240px] flex-col gap-1 p-1.5'>
            <Pressable
              onPress={() => console.log('Inbox')}
              className='flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100'
            >
              <Text className='text-slate-800'>Inbox</Text>
            </Pressable>

            <Pressable
              onPress={() => console.log('Trash')}
              className=' flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-red-50'
            >
              <Text className='text-red-600'>Trash</Text>
            </Pressable>

            <Pressable
              onPress={() => console.log('Settings')}
              className='flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100'
            >
              <Text className='text-slate-800'>Settings</Text>
            </Pressable>
          </View>
        </View>

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
