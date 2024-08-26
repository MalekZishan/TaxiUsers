import React, {useState, useRef} from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
  PanResponder,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '../../../constants/Fonts';

export type TabButtonsType = {
  title: string;
};

type TabButtonsPros = {
  buttons: TabButtonsType[];
  selectedTab: number;
  setselectedTab: React.Dispatch<React.SetStateAction<number>>;
};

const TabButtons = ({buttons, selectedTab, setselectedTab}: TabButtonsPros) => {
  const [Demension, setDemension] = useState({height: 20, width: 100});
  const buttonwidth = Demension.width / buttons.length;
  const tabPositionX = useSharedValue(buttonwidth * selectedTab);

  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDemension({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  const handlePress = (index: number) => {
    setselectedTab(index);
  };

  const onTabPress = (index: number) => {
    tabPositionX.value = withTiming(buttonwidth * index, {}, () => {
      runOnJS(handlePress)(index);
    });
  };

  const TabStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: tabPositionX.value}],
    };
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // No action on move, to prevent jittery UI
      },
      onPanResponderRelease: (evt, gestureState) => {
        const translateX = gestureState.dx;
        const targetIndex =
          selectedTab +
          Math.sign(translateX) *
            (Math.abs(translateX) > buttonwidth / 2 ? 1 : 0);

        if (targetIndex >= 0 && targetIndex < buttons.length) {
          onTabPress(targetIndex);
        } else {
          // If out of bounds, reset to the current tab
          onTabPress(selectedTab);
        }
      },
    }),
  ).current;

  return (
    <View
      style={{
        backgroundColor: '#766363',
        justifyContent: 'center',
        borderRadius: 30,
      }}>
      <Animated.View
        style={[
          TabStyle,
          {
            position: 'absolute',
            backgroundColor: '#fff',
            borderRadius: 30,
            marginHorizontal: 5,
            height: Demension.height - 10,
            width: buttonwidth - 10,
          },
        ]}
      />
      <View onLayout={onTabbarLayout} style={{flexDirection: 'row'}}>
        {buttons.map((button, index) => {
          const color = selectedTab === index ? '#159207' : '#fff';
          return (
            <Pressable
              key={index}
              onPress={() => {
                onTabPress(index);
              }}
              style={{flex: 1, paddingVertical: 15}}>
              <Text
                style={{
                  color: color,
                  fontFamily: Fonts.semiBold,
                  fontSize: 16,
                  alignSelf: 'center',
                }}>
                {button.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default TabButtons;

const styles = StyleSheet.create({});
