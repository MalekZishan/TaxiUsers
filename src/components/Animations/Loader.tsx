import {Modal, StyleSheet, Text, View} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {moderateScale, SQUARE, Styles, WIDTH} from '../../constants/Utils';
import LottieView from 'lottie-react-native';
import Images from '../../constants/Images';
import Colors from '../../constants/Colors';
import {medium} from '../CustomFont/MyFont';

type Props = {
  isBg?: boolean;
};

const Loader = ({isBg}: Props) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          alignItems: 'center',
          width: 140,
          height: 140,
        }}>
        <LottieView
          source={Images.Loader}
          autoPlay
          loop
          resizeMode="contain"
          style={{
            width: 140,
            height: 140,
            alignSelf: 'center',
          }}
        />
        <Text
          style={[
            medium(13),
            {
              position: 'absolute',
              bottom: 20,
              marginStart: 3,
            },
          ]}>
          Loading...
        </Text>
      </View>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  activityIndicatorWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 140,
    height: 140,
    alignSelf: 'center',
    padding: 10,
  },
});
