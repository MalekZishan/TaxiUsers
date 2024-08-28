import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../../../../constants/Colors';
import NavHeader from '../../../../../components/Headers/NavHeader';
import AvatarImg from '../../../../../components/Layouts/AvatarImg';
import MyKeyboardAvoidingScrollView from '../../../../../components/Scrollview/MyKeyboardAvoidingScrollView';
import LabelInputField from '../../../../../components/InputText/LableInputField';
import {moderateScale} from '../../../../../constants/Utils';
import AuthButton from '../../../../../components/Button/AuthButton';

const EditProfile = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      <NavHeader title="Edit Profile" />
      <MyKeyboardAvoidingScrollView
        style={{
          paddingHorizontal: 20,
        }}>
        <AvatarImg Onpress={() => {}} />

        <View
          style={{
            marginTop: moderateScale(60),
          }}>
          <LabelInputField placeholder="Full Name" label="Full Name" />
          <LabelInputField placeholder="Company Name" label="Company Name" />
          <LabelInputField placeholder="Mobile Number" label="Mobile Number" />
          <LabelInputField placeholder="Email Address" label="Email Address" />
        </View>
      </MyKeyboardAvoidingScrollView>
      <AuthButton title="Save" isbottom />
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
