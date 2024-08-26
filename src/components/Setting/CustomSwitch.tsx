import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  isEnabled: boolean;
  setIsEnabled: (value: React.SetStateAction<boolean>) => void;
};

const CustomSwitch = ({ isEnabled, setIsEnabled }: Props) => {
  const toggleSwitch = (p0: boolean) =>
    setIsEnabled(previousState => !previousState);

  const [switchAnim] = useState(new Animated.Value(isEnabled ? 1 : 0));

  const knobColor = '#ffff';
  const translateX = switchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 10], // Adjust this range according to the size of your switch
  });

  const toggleAnimatedSwitch = () => {
    Animated.spring(switchAnim, {
      toValue: isEnabled ? 0 : 1,
      useNativeDriver: true,
    }).start();

    toggleSwitch(!isEnabled);
  };
  return (
    <TouchableOpacity onPress={toggleAnimatedSwitch}>
      <LinearGradient
        locations={[0, 1]}
        useAngle={true}
        angle={98.49} // These are example colors; replace with your gradient
        style={styles.gradientSwitch}
        colors={isEnabled ? ['#F9F90E', '#FF3960'] : ['#D4D4D4', '#D4D4D4']} // Adjust these colors based on the color picker results
      >
        <Animated.View
          style={[
            styles.knob,
            {
              transform: [{ translateX }],
              backgroundColor: knobColor,
            },
          ]}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustomSwitch;

const styles = StyleSheet.create({
  gradientSwitch: {
    width: 49,
    height: 29,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginEnd: 10,
  },
  knob: {
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
});
