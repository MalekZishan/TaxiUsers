import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Styles} from '../../../../../constants/Utils';
import MyKeyboardAvoidingScrollView from '../../../../../components/Scrollview/MyKeyboardAvoidingScrollView';
import NavHeader from '../../../../../components/Headers/NavHeader';
import Images from '../../../../../constants/Images';
import InputFields from '../../../../../components/InputText/InputFields';
import AuthButton from '../../../../../components/Button/AuthButton';

const ChangePassword = () => {
  const initialValues = {
    oldPassword: '',
    newPassword: '',
    password: '',
  };

  return (
    <View style={Styles.flex1}>
      <NavHeader title="Change Password" />
      <MyKeyboardAvoidingScrollView
        style={{
          paddingHorizontal: 15,
          flex: 1,
        }}>
        <Image
          source={Images.ChangePass}
          resizeMode="contain"
          style={{
            width: 212,
            marginTop: 15,
            height: 200,
            alignSelf: 'center',
          }}
        />

        <View
          style={{
            marginTop: 20,
            flex: 1,
          }}>
          <InputFields
            placeholder="Current Password"
            lImg={Images.Password}
            rImg={Images.eye_open}
            name="oldPassword"
          />
          <InputFields
            placeholder="New Password"
            rImg={Images.eye_open}
            lImg={Images.Password}
            name={'newPassword'}
          />
          <InputFields
            placeholder="Confirm New Password"
            lImg={Images.Password}
            name={'password'}
          />
        </View>
      </MyKeyboardAvoidingScrollView>

      <AuthButton
        title="Reset Password"
        isbottom
        onPress={() => {
          console.log('d');
        }}
      />
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
