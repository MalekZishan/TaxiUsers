import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardTypeOptions,
  ImageSourcePropType,
  Image,
  TouchableOpacity,
  TextInputProps,
  ViewStyle,
  Pressable,
  ImageStyle,
  Platform,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {FormikErrors, FormikTouched, useFormik} from 'formik';
import YupError from '../Text/YupError';
import {
  DEVICE_TYPE,
  moderateScale,
  moderateScaleVertical,
} from '../../constants/Utils';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Images from '../../constants/Images';

export interface InputFieldsProps {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: (e?: any) => void;
  secureTextEntry?: boolean;
  isCountryCode?: boolean;
  keyboardType?: KeyboardTypeOptions;
  isline?: boolean;
  code?: string;
  CountryCode?: () => void;
  lImg?: ImageSourcePropType;
  rText?: string;
  onrPress?: () => void;
  rImg?: ImageSourcePropType;
  TextInputProps?: TextInputProps;
  lImageStyle?: ImageStyle;
  formik?: ReturnType<typeof useFormik<any>>;
  name?: string;
  error?: string;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  onRImgPress?: () => void;
}

const InputFields: React.FC<InputFieldsProps> = ({
  placeholder,
  onChangeText,
  value,
  onBlur,
  isCountryCode,
  isline,
  secureTextEntry,
  code,
  keyboardType,
  lImg,
  CountryCode,
  rText,
  onrPress,
  rImg,
  TextInputProps,
  lImageStyle,
  formik,
  name,
  error,
  style,
  containerStyle,
  onRImgPress,
}) => {
  let isTouched: FormikTouched<any> | undefined;
  let Err: FormikErrors<any> | undefined;

  if (formik && name) {
    const {values, handleBlur, handleChange, touched, errors} = formik;
    const formikName = name;
    value = values[formikName];
    onChangeText = handleChange(formikName);
    onBlur = handleBlur(formikName);
    isTouched = touched;
    Err = errors;
  }

  const isInputError = isTouched?.[name ?? ''] && Err?.[name ?? ''];

  const withoutStyleProps = {...TextInputProps};
  delete withoutStyleProps.style;

  const [isSecure, setIsSecure] = useState<boolean>(rImg == Images.eye_open);
  const [rigthImg, setRigthImg] = useState(rImg);

  if (rImg == Images.eye_open || rImg == Images.eye_close) {
    onRImgPress = () => {
      setRigthImg(isSecure ? Images.eye_close : Images.eye_open);
      setIsSecure(!isSecure);
    };
  }

  return (
    <>
      <View
        style={[
          {
            marginVertical: moderateScaleVertical(6),
            // elevation: 2,j
            borderRadius: moderateScale(8),
            height: moderateScale(48),
          },
          style,
        ]}>
        <View
          style={[
            {
              borderWidth: 1,
              padding: DEVICE_TYPE == 'ios' ? 10 : 0,
              paddingHorizontal: moderateScale(10),
              borderColor: '#E6E6E6',
              flexDirection: 'row',
              height: moderateScale(48),

              alignItems: 'center',
              borderRadius: moderateScale(8),
            },
            containerStyle,
          ]}>
          {isCountryCode ? (
            <TouchableOpacity onPress={CountryCode}>
              <Text
                style={{
                  color: '#A7A5A5',
                  fontSize: 14,
                  fontFamily: Fonts.THICCCBORegular,
                  marginEnd: 8,
                }}>
                {code}
              </Text>
            </TouchableOpacity>
          ) : (
            lImg && (
              <Image
                source={lImg}
                resizeMode={'contain'}
                style={{
                  width: moderateScale(24),
                  height: moderateScale(24),
                  marginRight: Platform.OS == 'android' ? 6 : 10,
                  ...lImageStyle,
                }}
              />
            )
          )}
          {isline && (
            <View
              style={{
                width: 18,
                marginStart: Platform.OS == 'ios' ? -5 : 0,
                borderColor: '#9E9FA6',
                borderWidth: 1,
                transform: [
                  {
                    rotate: '-90deg',
                  },
                ],
              }}
            />
          )}

          <TextInput
            placeholder={placeholder}
            value={value}
            clearTextOnFocus
            cursorColor={Colors.green}
            onBlur={onBlur}
            secureTextEntry={isSecure != undefined ? isSecure : secureTextEntry}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            placeholderTextColor={'#A7A5A5'}
            autoCapitalize="none"
            caretHidden={false}
            {...(keyboardType == 'email-address' && {
              textContentType: 'emailAddress',
              autoComplete: 'email',
            })}
            style={[styles.textInputStyle, TextInputProps?.style]}
            {...withoutStyleProps}
          />

          {rText && (
            <TouchableOpacity onPress={onrPress}>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 15,
                  fontFamily: Fonts.bold,
                }}>
                {rText}
              </Text>
            </TouchableOpacity>
          )}

          {rImg && (
            <Pressable onPress={onRImgPress}>
              <Image
                source={rigthImg}
                style={{
                  width: moderateScale(25),
                  height: moderateScale(25),
                }}
              />
            </Pressable>
          )}
        </View>
      </View>
      {isInputError && (
        <>
          <YupError err={Err?.[name ?? '']?.toString()} />
        </>
      )}
      {error && (
        <>
          <YupError err={error} />
        </>
      )}
    </>
  );
};

export default InputFields;

const styles = StyleSheet.create({
  textInputStyle: {
    fontFamily: Fonts.THICCCBORegular,
    flex: 1,
    color: '#1E1B1E',
    paddingVertical: DEVICE_TYPE == 'android' ? 8 : 0,
    // padding: 0,
    fontSize: moderateScale(14),
    includeFontPadding: false,
  },
});
