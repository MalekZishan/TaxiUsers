import React, {useState} from 'react';
import {
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedGestureHandler,
  useAnimatedKeyboard,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import Fonts from '../../constants/Fonts';
import {Checkbox} from './Checkbox';
import {PanGestureHandler} from 'react-native-gesture-handler';

const AnimationCheckBox = () => {
  const name = 'kamil';
  const data = new Array(20).fill(name).map((name, i) => {
    return {name: name, id: i + 1, isSelected: false};
  });

  const [Maindata, setMaindata] = useState(data);
  const x = useSharedValue(0);

  const keyboard = useAnimatedKeyboard();
  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: -keyboard.height.value}],
    };
  });

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'red',
        justifyContent: 'center',
        padding: 20,
      }}>
      <Animated.View style={translateStyle}>
        <TextInput
          style={{
            width: 200,
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 10,
          }}
        />
      </Animated.View>
    </ScrollView>
  );
};

export default AnimationCheckBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 200,
    padding: 10,
    gap: 12,
  },
  box: {
    padding: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 200,
    width: 50,
    height: 50,
    alignItems: 'center',
  },
  text: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
  },
});
