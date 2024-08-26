import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import React from 'react';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';

type Props = {
  text: string;
  Mystyle?: ViewStyle | TextStyle;
};

const TextWapper = (props: Props) => {
  return <Text style={[styles.text, props.Mystyle]}>{props.text}</Text>;
};

export default TextWapper;

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.bold,
    fontSize: 25,
    color: Colors.black,
  },
});
