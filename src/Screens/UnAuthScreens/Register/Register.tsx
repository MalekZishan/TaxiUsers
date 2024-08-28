import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../../constants/Colors';
import NavHeader from '../../../components/Headers/NavHeader';
import MyKeyboardAvoidingScrollView from '../../../components/Scrollview/MyKeyboardAvoidingScrollView';
import Fonts from '../../../constants/Fonts';
import {moderateScale} from '../../../constants/Utils';
import Images from '../../../constants/Images';
import {useGetStatusBarHeight} from '../../../Hooks/dimentionHook';
import LabelInputField from '../../../components/InputText/LableInputField';
import AuthButton from '../../../components/Button/AuthButton';
import NavigationText from '../../../components/Text/NavigationText';
import {goBack} from '../../../Services/NavigationService';

const Register = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: Colors.white,
      }}>
      <View
        style={{
          marginTop: useGetStatusBarHeight(),
          flex: 1,
        }}>
        <Image
          source={Images.backArr}
          style={{
            width: 24,
            height: 24,
            tintColor: Colors.black,
          }}
        />
        <Text
          style={{
            fontFamily: Fonts.semiBold,
            color: Colors.black,
            lineHeight: moderateScale(33),
            fontSize: moderateScale(22),
          }}>
          Create an Account
        </Text>
        <Text
          style={{
            fontFamily: Fonts.regular,
            marginTop: 5,
            color: Colors.gray,
            fontSize: moderateScale(14),
          }}>
          Aliquam a lobortis erat. Curabitur nec leo sit amet leo mollis
          euismod.
        </Text>
        <MyKeyboardAvoidingScrollView style={{}}>
          <LabelInputField label="Full Name" placeholder="Full Name" />
          <LabelInputField label="Company Name" placeholder="Company Name" />
          <LabelInputField label="Mobile Number" placeholder="Mobile Number" />
          <LabelInputField
            label="Email Address"
            placeholder="Email Address"
            keyboardType="email-address"
          />
          <LabelInputField label="Create Password" placeholder="Password" />
          <AuthButton title="Register" mt={20} />
        </MyKeyboardAvoidingScrollView>
      </View>
      <NavigationText
        title="Aready  have an account?"
        Prestext="Login."
        onPress={() => {
          goBack();
        }}
      />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
