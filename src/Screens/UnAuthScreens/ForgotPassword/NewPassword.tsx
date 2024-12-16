import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MyKeyboardAvoidingScrollView from '../../../components/Scrollview/MyKeyboardAvoidingScrollView';
import {useGetStatusBarHeight} from '../../../Hooks/dimentionHook';
import Images from '../../../constants/Images';
import {emailReg, moderateScale} from '../../../constants/Utils';
import Fonts from '../../../constants/Fonts';
import Colors from '../../../constants/Colors';
import InputFields from '../../../components/InputText/InputFields';
import AuthButton from '../../../components/Button/AuthButton';
import {useFormik} from 'formik';
import {apiWithToken} from '../../../ApiService/core/ApiRequest';
import {store} from '../../../Store/Store';
import {ENDPOINTS} from '../../../constants/API.Constants';
import {setUserToken} from '../../../Store/Data/Auth/AuthSlice';
import {
  Email,
  stringValidation,
  yupObj,
} from '../../../utils/schema/validation.schema';
import {navigate} from '../../../Services/NavigationService';
import LabelInputField from '../../../components/InputText/LableInputField';
import {t} from 'i18next';

const NewPassword = () => {
  const initialValues = {
    new_password: '',
  };
  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      // console.log(values);

      apiWithToken(ENDPOINTS.NewPassword, 'POST', values)
        .then(res => {
          navigate('Login');
          store.dispatch(setUserToken());
        })
        .catch(err => {
          console.log(err);
        });
    },
    validationSchema: () =>
      yupObj.shape({
        new_password: stringValidation(t('New password')),
      }),
  });
  //
  return (
    <View style={styles.container}>
      <MyKeyboardAvoidingScrollView>
        <View style={[styles.innerContainer]}>
          <View
            style={{
              width: '100%',
            }}>
            <LabelInputField
              label="Please enter your new password"
              lImg={Images.Password}
              containerStyle={styles.inputContainer}
              placeholder="Reset Password"
              rImg={Images.eye_close}
              {...{formik}}
              name="new_password"
            />
            <AuthButton
              title="Reset your password"
              mt={10}
              onPress={() => {
                formik.handleSubmit();
              }}
            />
          </View>
        </View>
      </MyKeyboardAvoidingScrollView>
    </View>
  );
};

export default NewPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: moderateScale(20),
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: moderateScale(157),
    height: moderateScale(140),
    alignSelf: 'center',
  },
  title: {
    fontFamily: Fonts.semiBold,
    color: Colors.black,
    fontSize: moderateScale(20),
    lineHeight: 33,
    marginTop: moderateScale(20),
    textAlign: 'center',
  },
  description: {
    fontFamily: Fonts.regular,
    color: Colors.gray,
    lineHeight: moderateScale(19),
    marginTop: moderateScale(13),
    fontSize: moderateScale(13),
    marginBottom: moderateScale(20),
    textAlign: 'center',
  },
  inputContainer: {
    // Additional custom styles for InputFields container can be added here
  },
});
