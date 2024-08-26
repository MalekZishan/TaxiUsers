import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  LayoutChangeEvent,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Colors from '../constants/Colors';
import {moderateScale} from '../constants/Utils';

const springConfig = (velocity: number) => {
  'worklet';
  return {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
    velocity,
  };
};

// change text to see the adaptation
const txt1 = '   Focused   ';
const txt2 = 'Others';

export default function SwipeButton() {
  const x = useSharedValue(0);
  const width1 = useSharedValue(0);
  const width2 = useSharedValue(0);

  const eventHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {startX: number}
  >({
    onStart: (event, ctx) => {
      ctx.startX = x.value;
    },
    onActive: (event, ctx) => {
      x.value = Math.max(
        0,
        Math.min(event.translationX + ctx.startX, width1.value),
      );
    },
    onEnd: event => {
      if (event.velocityX > 20) {
        x.value = withSpring(width1.value, springConfig(event.velocityX));
      } else if (event.velocityX < -20) {
        x.value = withSpring(0, springConfig(event.velocityX));
      } else if (x.value > width1.value / 2) {
        x.value = withSpring(width1.value, springConfig(event.velocityX));
      } else {
        x.value = withSpring(0, springConfig(event.velocityX));
      }
    },
  });

  const _style = useAnimatedStyle(() => {
    return {
      transform: [{translateX: x.value}],
      width: interpolate(
        x.value,
        [0, width1.value],
        [width1.value, width2.value],
        {
          extrapolateLeft: Extrapolate.CLAMP,
          extrapolateRight: Extrapolate.CLAMP,
        },
      ),
    };
  });

  const moveBackStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: -x.value}],
    };
  });

  const toggle = (toLeft: boolean) => {
    if (toLeft) {
      x.value = withSpring(0, springConfig(0));
    } else {
      x.value = withSpring(width1.value, springConfig(0));
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={styles.rowContainer}>
        <View style={styles.rowSubContainer}>
          <TouchableOpacity
            style={styles.rowSubContainer}
            onPress={() => toggle(true)}
            activeOpacity={1}>
            <Text
              onLayout={(e: LayoutChangeEvent) =>
                (width1.value = e.nativeEvent.layout.width)
              }
              style={styles.txt}>
              {txt1}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rowSubContainer}
            onPress={() => toggle(false)}
            activeOpacity={1}>
            <Text
              onLayout={(e: LayoutChangeEvent) =>
                (width2.value = e.nativeEvent.layout.width)
              }
              style={styles.txt}>
              {txt2}
            </Text>
          </TouchableOpacity>
        </View>
        <PanGestureHandler onGestureEvent={eventHandler}>
          <Animated.View style={[styles.moveBar, _style]}>
            <Animated.View
              style={[styles.rowSubContainer, styles.absPos, moveBackStyle]}>
              <Text style={[styles.txt, {color: '#000'}]}>{txt1}</Text>
              <Text style={[styles.txt, {color: '#000'}]}>{txt2}</Text>
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'red',
    borderWidth: 1,
    borderRadius: 8,
    height: moderateScale(44),

    borderColor: '#E6E6E6',
  },
  rowContainer: {
    overflow: 'hidden',
    backgroundColor: 'green',
    justifyContent: 'space-between',
  },
  rowSubContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'yellow',
  },
  txt: {
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  moveBar: {
    height: '100%',
    backgroundColor: Colors.green,
    borderRadius: 6,
    position: 'absolute',
    overflow: 'hidden',
  },
  absPos: {
    position: 'absolute',
  },
  info: {
    color: '#fff',
    letterSpacing: 2,
  },
});
