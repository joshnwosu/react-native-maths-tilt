import React from 'react';
import { Svg, Line, Path } from 'react-native-svg';
import { View, StyleSheet } from 'react-native';

interface RoadProps {
  roadBoundary: React.RefObject<any>;
}

// Road with straight and curved segments
const Road: React.FC<RoadProps> = ({ roadBoundary }) => {
  return (
    <View style={styles.roadContainer}>
      <Svg height='100%' width='100%' viewBox='0 0 200 200' ref={roadBoundary}>
        {/* Straight road */}
        <Line
          x1='0'
          y1='100'
          x2='200'
          y2='100'
          stroke='black'
          strokeWidth='10'
        />

        {/* Curved road (simulating a right turn) */}
        <Path
          d='M100 100 Q 100 150, 150 150'
          fill='transparent'
          stroke='black'
          strokeWidth='10'
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  roadContainer: {
    width: '100%',
    height: '50%',
    backgroundColor: '#e0e0e0', // Light grey background for visibility
  },
});

export default Road;
