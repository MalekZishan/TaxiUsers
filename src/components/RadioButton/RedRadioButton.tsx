import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {moderateScale, SQUARE, Styles} from '../../constants/Utils';
import Images from '../../constants/Images';
import {COLOR, regular} from '../CustomFont/MyFont';
import Colors from '../../constants/Colors';

type RadioButtonType = {
  text: string;
  selected: any;
  setSelected: (str: any) => void;
};

const RedRadioButton = ({selected, setSelected, text}: RadioButtonType) => {
  return (
    <Pressable
      onPress={() => setSelected(text)}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: selected == text ? Colors.LightGreen : '#FFFFFF',
        width: 45,
        // flex: 1,
        height: 45,
        top: -5,
        borderWidth: 1,
        borderColor: selected == text ? Colors.LightGreen : '#E3E3E3',
        borderRadius: 50,
        marginEnd: 20,

        // marginHorizontal: 10,
      }}>
      <Text style={regular(14, selected == text ? '#fff' : '#9BA49C')}>
        {text}
      </Text>
    </Pressable>
  );
};

export default RedRadioButton;

const styles = StyleSheet.create({});
