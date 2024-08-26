import React, {useEffect} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale} from '../../constants/Utils';

const {width} = Dimensions.get('window');

const SkeletonLoader = () => {
  const animatedValue = useSharedValue(-width);

  useEffect(() => {
    animatedValue.value = withRepeat(
      withTiming(width, {
        duration: 1500,
        easing: Easing.linear,
      }),
      -1, // -1 for infinite repeat
      false, // do not reverse direction
    );
  }, []);

  const animatedGradientStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: animatedValue.value}],
    };
  });

  const renderSkeletonItem = () => (
    <View style={styles.skeleton}>
      <Animated.View style={[StyleSheet.absoluteFill, animatedGradientStyle]}>
        <LinearGradient
          colors={['#e1e9ee94', '#f5f5f5', '#e1e9ee94']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );

  return <View style={styles.container}>{renderSkeletonItem()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e1e9ee94',
    marginRight: 10,
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
  },
  skeleton: {
    width: '100%',
    height: moderateScale(188),
    backgroundColor: '#e1e9ee94',
    marginBottom: 10,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: width - 20,
    height: 300,
    backgroundColor: '#e1e9ee94',
    borderRadius: 4,
    marginBottom: 20,
    overflow: 'hidden',
  },
  footer: {
    width: '100%',
  },
});

export default SkeletonLoader;
