import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../../../../constants/Colors';
import NavHeader from '../../../../../components/Headers/NavHeader';
import AvatarImg from '../../../../../components/Layouts/AvatarImg';
import MyKeyboardAvoidingScrollView from '../../../../../components/Scrollview/MyKeyboardAvoidingScrollView';
import LabelInputField from '../../../../../components/InputText/LableInputField';
import {moderateScale} from '../../../../../constants/Utils';
import AuthButton from '../../../../../components/Button/AuthButton';
import {BottomSheetImg} from '../../../../../components/Modals/BottomSheetImg';

const EditProfile = () => {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [UserProfileImage, setsetUserProfileImage] = useState('');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      <NavHeader title="Edit Profile" />
      <BottomSheetImg
        {...{bottomSheetVisible, setBottomSheetVisible}}
        setUserProfileImage={setsetUserProfileImage}
      />
      <MyKeyboardAvoidingScrollView
        style={{
          paddingHorizontal: 20,
        }}>
        <AvatarImg
          defaultSource={UserProfileImage}
          Onpress={() => {
            setBottomSheetVisible(true);
          }}
        />

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
