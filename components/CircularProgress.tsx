import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, G, Text } from 'react-native-svg';

type PercentageType = {
  percentage: number,
  color: string
};

const CircularProgress = ({ percentage, color }: PercentageType) => {
  const strokeWidth = 10; // Width of the progress bar
  const radius = 50; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const progress = percentage / 100; // Percentage value normalized to range [0, 1]

  // Calculate the length of the progress arc
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <View style={styles.container}>
      <Svg width={radius * 2} height={radius * 2}>
        {/* Background circle */}
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill= "none"
          stroke="#e6e6e6" // Adjust background color as needed
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <G rotation="-90" originX={radius} originY={radius}>
          <Circle
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
            fill="none"
            // stroke="#007bff" // Adjust progress color as needed
            stroke={color} // Adjust progress color as needed
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference}, ${circumference}`}
            strokeDashoffset={strokeDashoffset}
          />
        </G>
        {/* Percentage text */}
        <Text
          x={radius-2}
          y={radius+5}
          textAnchor="middle"
          stroke="#000" // Adjust text color as needed
          fontSize="20">
          {percentage}%
        </Text>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CircularProgress;
