import {
  StyleSheet,
  Text,
  View,
  TextInputProps,
  Pressable,
  ViewStyle,
  TextStyle,
  Image,
} from 'react-native';
import React from 'react';
import InputFields, {InputFieldsProps} from './InputFields';
import {Styles, moderateScale} from '../../constants/Utils';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import Images from '../../constants/Images';

export interface PropsLabelInputFieldProps extends InputFieldsProps {
  label?: string;
  rLabel?: string;
  customInput?: React.ReactNode;
  pressableStyle?: ViewStyle;
  TextStyle?: TextStyle;
}

const LabelInputField: React.FC<PropsLabelInputFieldProps> = props => {
  return (
    <Pressable
      style={[
        {
          marginTop: 10,
        },
        props.pressableStyle,
      ]}
      onPress={props.TextInputProps?.onPressIn}>
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
        ]}>
        <Text
          style={[
            {
              fontFamily: Fonts.regular,
              fontSize: moderateScale(15),
              color: Colors.black,
            },
            props.TextStyle,
          ]}>
          {props.label}
        </Text>

        {props.rLabel && (
          <Text
            style={{
              ...Styles.normalFontStyle,
              fontSize: moderateScale(14),
              paddingHorizontal: 15,
            }}>
            {props.rLabel}
          </Text>
        )}
      </View>
      {props.customInput ? props.customInput : <InputFields {...props} />}
    </Pressable>
  );
};

export default LabelInputField;

const styles = StyleSheet.create({});
