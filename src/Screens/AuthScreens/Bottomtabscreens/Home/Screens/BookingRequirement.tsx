import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../../../../constants/Colors';
import NavHeader from '../../../../../components/Headers/NavHeader';
import MyKeyboardAvoidingScrollView from '../../../../../components/Scrollview/MyKeyboardAvoidingScrollView';
import LabelInputField from '../../../../../components/InputText/LableInputField';
import DropDown from '../../../../../components/DropDown';
import AuthButton from '../../../../../components/Button/AuthButton';
import {goBack} from '../../../../../Services/NavigationService';

const BookingRequirement = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      <NavHeader title="Booking Requirement" />
      <MyKeyboardAvoidingScrollView
        style={{
          paddingHorizontal: 20,
        }}>
        <LabelInputField label="Booking For" placeholder="John Doe" />
        <LabelInputField label="Mobile Number" placeholder="Mobile Number" />
        <LabelInputField label="Pickup Address" placeholder="Pickup Address" />
        <LabelInputField
          label="Drop Off Address"
          placeholder="Drop Off Address"
        />
        <LabelInputField
          label="How Many Passengers?"
          placeholder="How Many Passengers?"
        />
        <DropDown items={data} label="Car Type" placeholder="Car Type" />
      </MyKeyboardAvoidingScrollView>
      <AuthButton
        title="Submit"
        isbottom
        onPress={() => {
          goBack();
        }}
      />
    </View>
  );
};

export default BookingRequirement;

const styles = StyleSheet.create({});

export const data = [
  {
    label: '1',
    value: 'John Doe',
  },
  {
    label: '2',
    value: 'John Doe',
  },
  {
    label: '3',
    value: 'John Doe',
  },
];
