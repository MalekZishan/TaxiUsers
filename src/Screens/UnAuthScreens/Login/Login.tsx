import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../../constants/Colors';
import {moderateScale} from '../../../constants/Utils';
import MyKeyboardAvoidingScrollView from '../../../components/Scrollview/MyKeyboardAvoidingScrollView';
import {useGetStatusBarHeight} from '../../../Hooks/dimentionHook';
import Images from '../../../constants/Images';
import Fonts from '../../../constants/Fonts';
import InputFields from '../../../components/InputText/InputFields';
import AuthButton from '../../../components/Button/AuthButton';
import NavigationText from '../../../components/Text/NavigationText';
import {navigate} from '../../../Services/NavigationService';

const Login = () => {
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
          <Text style={styles.loginText}>Login</Text>

          <View style={styles.inputContainer}>
            <InputFields
              placeholder="Email"
              lImg={Images.email}
              keyboardType="email-address"
            />
            <InputFields
              placeholder="Password"
              lImg={Images.Password}
              rImg={Images.eye_close}
            />

            <Pressable
              onPress={() => {
                navigate('ForgotPassword');
              }}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </Pressable>
            <AuthButton title="Login" mt={moderateScale(20)} />
          </View>
        </View>
      </MyKeyboardAvoidingScrollView>
      <NavigationText
        title="Don’t have an account?"
        Prestext="Register."
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
