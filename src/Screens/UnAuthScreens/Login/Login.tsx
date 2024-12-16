import {Image, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Colors from '../../../constants/Colors';
import {DEV_MODE, moderateScale} from '../../../constants/Utils';
import MyKeyboardAvoidingScrollView from '../../../components/Scrollview/MyKeyboardAvoidingScrollView';
import {useGetStatusBarHeight} from '../../../Hooks/dimentionHook';
import Images from '../../../constants/Images';
import Fonts from '../../../constants/Fonts';
import InputFields from '../../../components/InputText/InputFields';
import AuthButton from '../../../components/Button/AuthButton';
import NavigationText from '../../../components/Text/NavigationText';
import {navigate} from '../../../Services/NavigationService';
import {apiWithToken} from '../../../ApiService/core/ApiRequest';
import {ENDPOINTS} from '../../../constants/API.Constants';
import {useFormik} from 'formik';
import {store} from '../../../Store/Store';
import {
  setIsIntroDone,
  setUserData,
  setUserToken,
  UserisUserAuthenticated,
} from '../../../Store/Data/Auth/AuthSlice';
import {loginSchema} from '../../../utils/schema/Auth.schema';
import {t} from 'i18next';

const Login = () => {
  const initialValues = {
    email: DEV_MODE ? 'test@gmail.com' : '',
    password: DEV_MODE ? '123456789' : '',
  };
  useEffect(() => {
    store.dispatch(setIsIntroDone(true));
  }, []);
  const formik = useFormik({
    initialValues,
    onSubmit: async values => {
      // let deviceId = await generateToken();
      let deviceId = 'aff';
      // console.log(values);
      const data = {
        email: values.email,
        password: values.password,
        device_token: deviceId,
        device_type: Platform.OS === 'ios' ? '2' : '1',
      };
      apiWithToken(ENDPOINTS.login, 'POST', data)
        .then(res => {
          store.dispatch(setUserToken(res.token));
          store.dispatch(setUserData(res.data));
          store.dispatch(UserisUserAuthenticated(true));
        })
        .catch(err => {
          console.log(err);
        });
    },
    validationSchema: loginSchema(),
  });
  return (
    <View style={styles.container}>
      <MyKeyboardAvoidingScrollView>
        <View
          style={[
            styles.innerContainer,
            {marginTop: useGetStatusBarHeight() + 90},
          ]}>
          <Image
            resizeMode="contain"
            source={Images.intro}
            style={styles.logo}
          />
          <Text style={styles.loginText}>{t('Login')}</Text>

          <View style={styles.inputContainer}>
            <InputFields
              placeholder={t('Email')}
              lImg={Images.email}
              keyboardType="email-address"
              {...{formik}}
              name="email"
            />
            <InputFields
              placeholder={t('Password')}
              lImg={Images.Password}
              rImg={Images.eye_close}
              {...{formik}}
              name="password"
            />

            <Pressable
              onPress={() => {
                navigate('ForgotPassword');
              }}>
              <Text style={styles.forgotPasswordText}>
                {t('Forgot Password?')}
              </Text>
            </Pressable>
            <AuthButton
              title={t('Login')}
              mt={moderateScale(20)}
              onPress={() => {
                formik.handleSubmit();
              }}
            />
          </View>
        </View>
      </MyKeyboardAvoidingScrollView>
      <NavigationText
        title={t('Don’t have an account?')}
        Prestext={t('Register.')}
        onPress={() => {
          navigate('Register');
        }}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: moderateScale(20),
  },
  innerContainer: {
    marginTop: moderateScale(90), // useGetStatusBarHeight() + 90 will override this if used
  },
  logo: {
    width: moderateScale(189),
    height: moderateScale(105),
    alignSelf: 'center',
    marginBottom: moderateScale(30),
  },
  loginText: {
    fontFamily: Fonts.semiBold,
    alignSelf: 'center',
    color: Colors.black,
    fontSize: moderateScale(22),
  },
  inputContainer: {
    marginTop: moderateScale(15),
  },
  forgotPasswordText: {
    fontFamily: Fonts.bold,
    fontSize: moderateScale(15),
    alignSelf: 'center',
    marginTop: moderateScale(15),
    color: Colors.blue,
  },
});
