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
import {goBack} from '../../../../../Services/NavigationService';
import {useAppSelector} from '../../../../../Hooks/ReduxHooks';
import {
  setUserData,
  updateUserData,
  userDataSelector,
} from '../../../../../Store/Data/Auth/AuthSlice';
import {useFormik} from 'formik';
import {editProfileSchema} from '../../../../../utils/schema/Auth.schema';
import {
  apiWithToken,
  ImageFormData,
  imgSrc,
} from '../../../../../ApiService/core/ApiRequest';
import {ENDPOINTS} from '../../../../../constants/API.Constants';
import {store} from '../../../../../Store/Store';
import {Options} from 'react-native-image-crop-picker';
import {t} from 'i18next';

const ImageOptions: Options = {
  mediaType: 'photo',
  cropperCircleOverlay: true,
  cropping: true,
  showCropGuidelines: false,
  showCropFrame: false,
};

const EditProfile = () => {
  const {data} = useAppSelector(userDataSelector);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [UserProfileImage, setsetUserProfileImage] = useState<any>(
    data?.profile_pic,
  );

  const formik = useFormik({
    initialValues: {
      full_name: data?.full_name,
      phone_number: data?.phone_number,
      company_name: data?.company_name,
      email: data?.email,
    },
    validationSchema: editProfileSchema(),
    onSubmit: values => {
      const formData: ImageFormData = [];
      if (UserProfileImage?.path) {
        formData.push({
          name: 'profile_pic',
          data: [{uri: UserProfileImage?.path}],
        });
      }
      apiWithToken(
        ENDPOINTS.UpdateProfile,
        'PATCH',
        {full_name: values?.full_name},
        false,
        false,
        '',
        formData,
      ).then(res => {
        store.dispatch(updateUserData(res.data));
        goBack();
      });
      console.log(values);
    },
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      <NavHeader title={t('Edit Profile')} />
      <BottomSheetImg
        {...{bottomSheetVisible, setBottomSheetVisible}}
        setUserProfileImage={setsetUserProfileImage}
        rectangle={ImageOptions}
      />
      <MyKeyboardAvoidingScrollView
        style={{
          width: '90%',
          alignSelf: 'center',
        }}>
        <AvatarImg
          defaultSource={
            UserProfileImage?.path
              ? UserProfileImage?.path
              : imgSrc(UserProfileImage)
          }
          Onpress={() => {
            setBottomSheetVisible(true);
          }}
        />

        <View
          style={{
            marginTop: moderateScale(60),
          }}>
          <LabelInputField
            placeholder={t('Full Name')}
            label={t('Full Name')}
            name="full_name"
            {...{formik}}
          />
          <LabelInputField
            placeholder={t('Company Name')}
            label={t('Company Name')}
            name="company_name"
            {...{formik}}
            TextInputProps={{editable: false}}
          />
          <LabelInputField
            placeholder={t('Mobile Number')}
            label={t('Mobile Number')}
            {...{formik}}
            name="phone_number"
            TextInputProps={{editable: false}}
          />
          <LabelInputField
            placeholder={t('Email Address')}
            label={t('Email Address')}
            {...{formik}}
            name="email"
            TextInputProps={{editable: false}}
          />
        </View>
      </MyKeyboardAvoidingScrollView>
      <AuthButton title={t('Save')} isbottom onPress={formik.handleSubmit} />
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
