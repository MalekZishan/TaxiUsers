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
import {
  useBottomBarHeight,
  useGetStatusBarHeight,
} from '../../Hooks/dimentionHook';

type Props = {
  title: string;
  onPress?: () => void;
  image?: ImageSourcePropType;
  index?: number;
  textStyle?: TextStyle;
  Mystyle?: ViewStyle;
  isbottom?: boolean;
  mt?: number;
  disabled?: boolean;
};

const AuthButton = ({
  title,
  onPress,
  image,
  index,
  Mystyle,
  mt,
  textStyle,
  disabled,
  isbottom,
}: Props) => {
  return (
    <>
      <Pressable
        disabled={disabled}
        style={{
          marginBottom: isbottom ? useBottomBarHeight() : 0,
          paddingHorizontal: isbottom ? 20 : 0,
        }}>
        <Pressable
          disabled={disabled}
          style={[
            styles.container,
            Mystyle,
            {
              marginTop: mt,
            },
          ]}
          {...{onPress}}>
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </Pressable>
      </Pressable>
    </>
  );
};

export default AuthButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(60),
    width: '100%',
    height: moderateScale(45),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blue,
  },
  text: {
    fontFamily: Fonts.semiBold,
    color: '#fff',
    fontSize: moderateScale(14),
    // lineHeight: 1
    top: Platform.OS == 'ios' ? 0 : -2,
  },
});
