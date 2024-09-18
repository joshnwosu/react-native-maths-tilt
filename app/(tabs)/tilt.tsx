import Card from '@/components/Shared/Card/Card';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

export default function TiltScreen() {
  const options = [
    { name: 'Gyroscope', link: '/gyroscope' },
    { name: 'Direction', link: '/direction' },
    { name: 'Swipe', link: '/swipe' },
    { name: 'Tap', link: '/tap' },
  ];
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Tilt Examples:</ThemedText>
      <Card>
        {options.map((item, index) => (
          <Link key={index.toString()} href={item.link as any} asChild>
            <Pressable
              onPress={() => console.log(item)}
              className='flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-600'
            >
              <ThemedText type='subtitle'>{item.name}</ThemedText>
            </Pressable>
          </Link>
        ))}
      </Card>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
