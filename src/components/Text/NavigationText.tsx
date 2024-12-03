import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import {
  useBottomBarHeight,
  useGetStatusBarHeight,
} from '../../Hooks/dimentionHook';
import {PL} from '../CustomFont/MyFont';
import {moderateScale} from '../../constants/Utils';

type Props = {
  title: string;
  onPress?: () => void;
  Prestext: string;
};

const NavigationText = ({title, onPress, Prestext}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: useBottomBarHeight(),

        alignItems: 'center',
      }}>
      <Text style={styles.dontHaveAn}>{title}</Text>
      <Text
        style={{
          fontFamily: Fonts.bold,
          color: Colors.blue,
          fontSize: moderateScale(15),
          marginLeft: 2,
        }}>
        {Prestext}
      </Text>
    </Pressable>
  );
};

export default NavigationText;

const styles = StyleSheet.create({
  dontHaveAn: {
    fontFamily: Fonts.regular,
    fontSize: moderateScale(15),
    color: Colors.black,
  },
});
