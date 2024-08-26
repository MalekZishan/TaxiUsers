import {
  Image,
  ImageSourcePropType,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {
  BOLD,
  FLEX,
  F_SIZE,
  HEIGHT,
  SQUARE,
  Styles,
  moderateScale,
  moderateScaleVertical,
} from '../../constants/Utils';
import Colors from '../../constants/Colors';
import Images from '../../constants/Images';
import Animated, {FadeInUp} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '../../constants/Fonts';
import {useGetStatusBarHeight} from '../../Hooks/dimentionHook';

type Props = {
  title: string;
  onPress?: () => void;
  image?: ImageSourcePropType;
  index?: number;
  textStyle?: TextStyle;
  Mystyle?: ViewStyle;
  isbottom?: boolean;
};

const AuthButton = ({
  title,
  onPress,
  image,
  index,
  Mystyle,
  textStyle,

  isbottom,
}: Props) => {
  return (
    <Pressable style={[styles.container, Mystyle]} {...{onPress}}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
};

export default AuthButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(8),
    width: '100%',
    height: moderateScale(50),

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.green,
  },
  text: {
    fontFamily: Fonts.THICCCBOISEMIBOLD,
    color: '#fff',
    fontSize: moderateScale(18),
    // lineHeight: 1
    top: Platform.OS == 'ios' ? 0 : -2,
  },
});
