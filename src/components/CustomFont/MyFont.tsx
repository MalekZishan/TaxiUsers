import {Dimensions, Platform, StyleSheet} from 'react-native';
import Fonts from '../../constants/Fonts';
import {F, moderateScale} from '../../constants/Utils';
import Colors from '../../constants/Colors';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;
export const DEVICE_TYPE = Platform.OS;
export const isIOS = DEVICE_TYPE === 'ios';
export default {
  validateEmail(email: string) {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
};

export const F_SIZE = (val: number): any => ({
  fontSize: F(val),
});
export const F_Family = (val: string): any => ({
  fontFamily: val,
});
export const MV = (val: number): any => ({
  marginVertical: moderateScale(val),
});
export const MR = (val: number): any => ({
  marginRight: moderateScale(val),
});
export const ML = (val: number): any => ({
  marginLeft: moderateScale(val),
});
export const MH = (val: number): any => ({
  marginHorizontal: moderateScale(val),
});
export const MT = (val: number): any => ({
  marginTop: moderateScale(val),
});
export const MB = (val: number): any => ({
  marginBottom: moderateScale(val),
});
export const COLOR = (val: string): any => ({
  color: val,
});
export const PV = (val: number): any => ({
  paddingVertical: moderateScale(val),
});
export const PH = (val: number): any => ({
  paddingHorizontal: moderateScale(val),
});
export const PL = (val: number): any => ({
  paddingLeft: moderateScale(val),
});
export const PR = (val: number): any => ({
  paddingRight: moderateScale(val),
});
export const PB = (val: number): any => ({
  paddingBottom: moderateScale(val),
});
export const PT = (val: number): any => ({
  paddingTop: moderateScale(val),
});
export const BCOLOR = (val: string): any => ({
  backgroundColor: val,
});
export const BR = (val: number): any => ({
  borderRadius: moderateScale(val),
});
export const h = (val: any): any => ({
  height: moderateScale(val),
});
export const w = (val: any): any => ({
  width: moderateScale(val),
});

export const SQUARE = (val: any): any => ({
  width: moderateScale(val),
  height: moderateScale(val),
});

export const CIRCLE = (SIZE: number): any => ({
  width: moderateScale(SIZE),
  height: moderateScale(SIZE),
  borderRadius: SIZE,
});

export const light = (SIZE: number, colors?: string): any => ({
  fontFamily: Fonts.light,
  fontSize: SIZE,
  color: colors ? colors : Colors.black,
});
export const medium = (SIZE: number, colors?: string): any => ({
  fontFamily: Fonts.medium,
  fontSize: SIZE,
  color: colors ? colors : Colors.black,
});
export const regular = (SIZE: number, colors?: string): any => ({
  fontFamily: Fonts.regular,
  fontSize: SIZE,
  color: colors ? colors : Colors.black,
});
export const semiBold = (
  SIZE: number,
  colors?: string,
  light?: number,
): any => ({
  fontFamily: Fonts.semiBold,
  fontSize: SIZE,

  color: colors ? colors : Colors.black,
});
export const bold = (SIZE: number, colors?: string): any => ({
  fontFamily: Fonts.bold,

  fontSize: SIZE,

  color: colors ? colors : Colors.black,
});
