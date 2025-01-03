import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MyKeyboardAvoidingScrollView from '../../../components/Scrollview/MyKeyboardAvoidingScrollView';
import {useGetStatusBarHeight} from '../../../Hooks/dimentionHook';
import Images from '../../../constants/Images';
import {moderateScale} from '../../../constants/Utils';
import Fonts from '../../../constants/Fonts';
import Colors from '../../../constants/Colors';
import InputFields from '../../../components/InputText/InputFields';
import AuthButton from '../../../components/Button/AuthButton';
import {t} from 'i18next';
import {useFormik} from 'formik';
import {apiWithToken} from '../../../ApiService/core/ApiRequest';
import {ENDPOINTS} from '../../../constants/API.Constants';
import {setUserToken} from '../../../Store/Data/Auth/AuthSlice';
import {store} from '../../../Store/Store';
import {navigate} from '../../../Services/NavigationService';
import {Email, yupObj} from '../../../utils/schema/validation.schema';

const ForgotPassword = () => {
  const initialValues = {
    email: '',
  };
  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      // console.log(values);
      apiWithToken(ENDPOINTS.ForgotOTP, 'POST', values)
        .then(res => {
          store.dispatch(setUserToken(res.token));
          navigate('ForgotEmailVerfication', {
            email: values.email,
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    validationSchema: () =>
      yupObj.shape({
        email: Email,
      }),
  });
  return (
    <View style={styles.container}>
      <MyKeyboardAvoidingScrollView>
        <View
          style={[
            styles.innerContainer,
            {marginTop: useGetStatusBarHeight() + 100},
          ]}>
          <Image source={Images.forgotPass} style={styles.image} />

          <Text style={styles.title}>{t('Forgot Password')}</Text>
          <Text style={styles.description}>
            {t('Please enter email address associated with your account.')}
          </Text>

          <InputFields
            lImg={Images.email}
            containerStyle={styles.inputContainer}
            placeholder={t('Email')}
            keyboardType="email-address"
            {...{formik}}
            name="email"
          />
          <AuthButton
            title={t('Submit')}
            mt={10}
            onPress={() => formik.handleSubmit()}
          />
        </View>
      </MyKeyboardAvoidingScrollView>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: moderateScale(20),
  },
  innerContainer: {
    marginTop: moderateScale(100), // This will be overridden by useGetStatusBarHeight() + 100
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
