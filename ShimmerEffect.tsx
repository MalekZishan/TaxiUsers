import React, {FC, useEffect} from 'react';
import {Image, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import {moderateScale, width} from './src/constants/Utils';
import Images from './src/constants/Images';
type Props = {
  style?: ViewStyle | TextStyle;
  children?: React.ReactNode;
};
export const ShimmerEffect: FC<Props> = ({style, children}) => {
  const translateX = useSharedValue(-width);

  // Infinite shimmer animation
  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(width, {duration: 1500}),
      -1, // Infinite repetition
      true, // Alternate (so it resets smoothlby)
    );
  }, [translateX]);

  // Shimmer animated style
  const shimmerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  return (
    <View style={[styles.shimmerWrapper, style]}>
      <Animated.View style={[styles.shimmer, shimmerAnimatedStyle]}>
        <LinearGradient
          colors={[
            'rgba(255,255,255,0.1)',
            'rgba(255,255,255,0.5)',
            'rgba(255,255,255,0)',
          ]}
          style={styles.gradient}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}></LinearGradient>
      </Animated.View>
    </View>
  );
};

const InstagramShimmerLoader = () => {
  return (
    <View style={styles.container}>
      {/* Simulate Instagram Post Loader */}
      <View style={styles.postContainer}>
        {/* Profile Picture */}
        <ShimmerEffect style={styles.profileCircle} />

        {/* Username and time */}
        <View style={styles.textContainer}>
          <ShimmerEffect style={styles.username} />
          <ShimmerEffect style={styles.time} />
        </View>
      </View>

      {/* Simulate Image Post Loader */}
      <View style={styles.postImage}>
        <Image
          source={Images.Skip}
          style={{
            position: 'absolute',
            zIndex: 1,
          }}
        />
        <ShimmerEffect style={styles.postImage} />
      </View>
      {/* Simulate Caption Loader */}
      <ShimmerEffect style={styles.captionLine1} />
      <ShimmerEffect style={styles.captionLine2} />

      {/* Simulate Like and Comment Section Loader */}
      <View style={styles.likeCommentContainer}>
        <ShimmerEffect style={styles.likeBar} />
        <ShimmerEffect style={styles.commentBar} />
      </View>
    </View>
  );
};

export default InstagramShimmerLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScale(100),
    backgroundColor: '#fff',
  },
  shimmerWrapper: {
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
  },
  shimmer: {
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    width: moderateScale(150),
    height: '100%',
  },
  postContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(10),
  },
  profileCircle: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
  },
  textContainer: {
    flex: 1,
    marginLeft: moderateScale(10),
  },
  username: {
    width: moderateScale(120),
    height: moderateScale(15),
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(6),
  },
  time: {
    width: moderateScale(80),
    height: moderateScale(12),
    borderRadius: moderateScale(8),
  },
  postImage: {
    width: '100%',
    height: moderateScale(250),
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(10),
  },
  captionLine1: {
    width: '80%',
    height: moderateScale(12),
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(6),
  },
  captionLine2: {
    width: '60%',
    height: moderateScale(12),
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(10),
  },
  likeCommentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  likeBar: {
    width: '40%',
    height: moderateScale(12),
    borderRadius: moderateScale(8),
  },
  commentBar: {
    width: '40%',
    height: moderateScale(12),
    borderRadius: moderateScale(8),
  },
});
