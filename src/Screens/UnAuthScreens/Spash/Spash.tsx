import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Images from '../../../constants/Images';
import Colors from '../../../constants/Colors';
import {moderateScale} from '../../../constants/Utils';
import Animated, {BounceIn, BounceOut, FadeIn} from 'react-native-reanimated';

const Splash = () => {
  return (
    <View
      style={{
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        translucent
        animated={true}
      />

      <Animated.Image
        entering={BounceIn.duration(1800).damping(0.1)}
        exiting={BounceOut.duration(1300).damping(0.3)}
        source={Images.intro}
        resizeMode="contain"
        style={{
          width: moderateScale(190),
          height: moderateScale(166),
          alignSelf: 'center',
        }}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
