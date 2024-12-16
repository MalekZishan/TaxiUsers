import {I18nManager, StyleSheet, Text, TextStyle, View} from 'react-native';
import React from 'react';
import Fonts from '../../constants/Fonts';
import Animated, {FadeIn, FadeOutLeft} from 'react-native-reanimated';

interface yupErrorType {
  err?: string;
  styles?: TextStyle;
}
const YupError = ({err, styles}: yupErrorType) => {
  return (
    <Animated.Text
      entering={FadeIn}
      style={{
        color: 'red',
        fontFamily: Fonts.regular,
        fontSize: 14,
        marginTop: -4,
        alignSelf: I18nManager.isRTL ? 'flex-start' : undefined,
        ...styles,
      }}>
      {err}
    </Animated.Text>
  );
};

export default YupError;
