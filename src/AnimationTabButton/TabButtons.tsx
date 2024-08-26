import React, {useState, useRef, useCallback} from 'react';
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
  withTiming,
} from 'react-native-reanimated';
import Colors from '../constants/Colors';
import {moderateScale} from '../constants/Utils';
import Fonts from '../constants/Fonts';

export type TabButtonsType = {
  title: string;
};

type TabButtonsPros = {
  buttons: TabButtonsType[];
  selectedTab: number;
  isbordered?: boolean;
  setselectedTab: React.Dispatch<React.SetStateAction<number>>;
};

const TabButtons = ({
  buttons,
  selectedTab,
  setselectedTab,
  isbordered,
}: TabButtonsPros) => {
  console.log('🚀 ~ selectedTab:', selectedTab);
  const [dimension, setDimension] = useState({height: 20, width: 100});
  const buttonWidth = dimension.width / buttons.length;
  const tabPositionX = useSharedValue(buttonWidth * selectedTab);

  const onTabbarLayout = useCallback((e: LayoutChangeEvent) => {
    setDimension({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  }, []);

  const handlePress = useCallback((index: number) => {
    setselectedTab(index);
  }, []);

  const onTabPress = (index: number) => {
    tabPositionX.value = withTiming(buttonWidth * index, {}, () => {
      runOnJS(handlePress)(index);
    });
  };

  const tabStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: tabPositionX.value}],
    };
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Preventing jittery UI by not updating during move
      },
      onPanResponderRelease: (evt, gestureState) => {
        const translateX = gestureState.dx;
        const targetIndex =
          selectedTab +
          Math.sign(translateX) *
            (Math.abs(translateX) > buttonWidth / 2 ? 1 : 0);

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
        backgroundColor: '#FFFFFF',
        height: 44,
        borderWidth: 1,
        justifyContent: 'center',
        borderRadius: 8,
        borderColor: isbordered ? Colors.green : '#E6E6E6',
      }}
      {...panResponder.panHandlers}>
      <Animated.View
        style={[
          tabStyle,
          {
            position: 'absolute',
            backgroundColor: Colors.green,
            borderRadius: 6,
            marginHorizontal: 5,
            height: dimension.height - 9,
            width: buttonWidth - 10,
          },
        ]}
      />
      <View onLayout={onTabbarLayout} style={{flexDirection: 'row'}}>
        {buttons.map((button, index) => {
          const color = selectedTab === index ? '#FAFAFA' : '#9E9FA6';
          return (
            <Pressable
              key={index}
              onPress={() => {
                onTabPress(index);
              }}
              style={{
                flex: 1,
                // paddingVertical: 14,
                alignItems: 'center',
                justifyContent: 'center',
                height: 44,
              }}>
              <Text
                style={{
                  color: color,
                  fontFamily: Fonts.THICCCBOMedium,
                  fontSize: moderateScale(14),
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
