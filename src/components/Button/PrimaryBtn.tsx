import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {moderateScale, moderateScaleVertical} from '../../constants/Utils';
import Fonts from '../../constants/Fonts';
import {SQUARE, CIRCLE, Styles} from '../../constants/Utils';
import Colors from '../../constants/Colors';
import {semiBold} from '../CustomFont/MyFont';

export type PrimaryBtnProps = {
  title: string;
  onPress?: () => void;
  pdVr?: number;
  mrVr?: number;
  mrHr?: number;
  mrTp?: number;
  height?: number;
  mrBm?: number;
  bgColor?: string;
  color?: string;
  rImg?: ImageSourcePropType;
  rImgTintColor?: string;
  lImg?: ImageSourcePropType;
  lImgTintColor?: string;
  fontFam?: string;
  fSize?: number;
  pdHr?: number;
  borderColor?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  textstyle?: TextStyle;
  rCount?: number;
  borderStyleBtn?: string;
  secondLayout?: boolean;

  borderRadius?: number;
};

const PrimaryBtn: React.FC<PrimaryBtnProps> = ({
  title,
  bgColor = Colors.LightGreen,
  pdVr = 13,
  textstyle,
  mrVr,
  mrHr,
  mrBm,
  mrTp,
  color = 'white',
  onPress,
  rImg,
  rImgTintColor,
  fontFam = Fonts.bold,
  height = 45,
  fSize = 16,
  pdHr = 10,
  borderColor = 'transparent',
  isLoading = false,
  isDisabled,
  lImg,
  lImgTintColor,
  rCount,
  borderStyleBtn,
  secondLayout,
  borderRadius = 40,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isDisabled}
      style={[
        {
          height: height,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: borderColor,
          borderRadius: borderRadius,
          marginTop: mrTp,
        },
      ]}>
      <Text style={[semiBold(14, '#828282'), textstyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryBtn;

const styles = StyleSheet.create({});
