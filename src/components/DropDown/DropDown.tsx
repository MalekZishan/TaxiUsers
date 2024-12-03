import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';

import {
  F_Family,
  HEIGHT,
  SQUARE,
  Styles,
  moderateScale,
  moderateScaleVertical,
} from '../../constants/Utils';
import Colors from '../../constants/Colors';
import Images from '../../constants/Images';
import {Dropdown} from 'react-native-element-dropdown';
import {DropdownProps} from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';
import Fonts from '../../constants/Fonts';
import {FormikErrors, FormikTouched, useFormik} from 'formik';
import YupError from '../Text/YupError';
import {apiWithToken} from '../../ApiService/core/ApiRequest';

export type ItemType = {label: string; value: string | number};

export interface DropDownProps {
  label?: string;
  items: ItemType[];
  style?: ViewStyle;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  placeholderStyle?: TextStyle;
  textStyle?: TextStyle;
  name?: string;
  formik?: ReturnType<typeof useFormik<any>>;
  error?: string;
  isearch?: boolean;
  OnpressAdd?: () => void;
  texStyle?: TextStyle;
  callback?: () => void;
  isD?: boolean;
}
const DropDown = ({
  label,
  items,
  setValue,
  style,
  value,
  placeholder,
  placeholderStyle,
  texStyle,
  textStyle,
  isearch,
  formik,
  name,
  error,
}: DropDownProps) => {
  let isTouched: FormikTouched<any> | undefined;
  let Err: FormikErrors<any> | undefined;
  const [AddBrandname, setAddBrandname] = useState('');
  if (formik && name) {
    const {values, touched, errors} = formik;
    const formikName = name;
    value = values[formikName];
    isTouched = touched;
    Err = errors;
  }

  const onChange = (item: ItemType) => {
    setValue && setValue(String(item.value));
    if (formik && name) {
      formik.setFieldValue(name, item.value?.toString());
    }
  };

  return (
    <View
      style={{
        marginVertical: label ? moderateScaleVertical(8) : 0,
        gap: label ? moderateScaleVertical(10) : 0,
      }}>
      {label && (
        <Text
          style={[
            {
              fontFamily: Fonts.regular,
              fontSize: moderateScale(14),
              color: Colors.black,
            },
            texStyle,
          ]}>
          {label}
        </Text>
      )}

      <Dropdown
        style={[styles.dropdown, style]}
        placeholderStyle={[
          {color: '#B7B7B7', fontSize: 14},
          F_Family(Fonts.regular),
          placeholderStyle,
        ]}
        selectedTextStyle={[Styles.normalFontStyle, textStyle]}
        itemTextStyle={[Styles.normalFontStyle, textStyle, {color: '#4f4f4f'}]}
        data={items}
        maxHeight={HEIGHT * 0.24}
        labelField="label"
        keyboardAvoiding
        search={isearch}
        fontFamily={Fonts.regular}
        searchQuery={(keyword: string, labelValue: string) => {
          setAddBrandname(keyword);
          return labelValue.toLowerCase().includes(keyword.toLowerCase());
        }}
        inputSearchStyle={{
          color: 'black',
          fontFamily: Fonts.regular,
          borderRadius: moderateScale(15),
          // marginTop: 10,
          fontSize: 14,
        }}
        autoScroll
        mode="default"
        closeModalWhenSelectedItem
        selectedTextProps={{
          style: {
            color: Colors.gray,
            fontSize: moderateScale(14),
            fontFamily: Fonts.regular,
            marginStart: 10,
            ...textStyle,
          },
        }}
        containerStyle={{
          borderRadius: moderateScale(15),
        }}
        valueField="label"
        searchPlaceholder="Search  brand"
        placeholder={placeholder}
        {...{value}}
        onChange={onChange}
        renderRightIcon={() => (
          <>
            <Image
              source={Images.arrow_rightdown}
              resizeMode="contain"
              style={SQUARE(moderateScale(label ? 27 : 16))}
            />
          </>
        )}
      />

      {isTouched?.[name ?? ''] && Err?.[name ?? ''] && (
        <>
          <View style={{marginTop: moderateScaleVertical(-2)}}>
            <YupError err={Err?.[name ?? '']?.toString()} />
          </View>
        </>
      )}
      {error && (
        <>
          <View style={{marginTop: moderateScaleVertical(-15)}}>
            <YupError err={error} />
          </View>
        </>
      )}
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  dropdown: {
    paddingHorizontal: moderateScale(10),
    borderColor: '#E6E6E6',

    color: Colors.black,
    fontFamily: Fonts.regular,
    borderRadius: moderateScale(50),
    backgroundColor: '#F8F8F8',
    height: moderateScale(48),
    paddingVertical: moderateScaleVertical(5),
  },
  noDataView: {
    alignItems: 'center',
    padding: moderateScale(10),
  },
  noDataText: {
    fontSize: moderateScale(14),
    color: Colors.black,
    marginBottom: moderateScale(10),
  },
});
