import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MyKeyboardAvoidingScrollView from '../../../components/Scrollview/MyKeyboardAvoidingScrollView';
import {useGetStatusBarHeight} from '../../../Hooks/dimentionHook';
import Images from '../../../constants/Images';
import {moderateScale, width} from '../../../constants/Utils';
import Fonts from '../../../constants/Fonts';
import Colors from '../../../constants/Colors';
import AuthButton from '../../../components/Button/AuthButton';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {NavigationProps} from '../../../Models/Navigation/NavigationModels';
import {ENDPOINTS} from '../../../constants/API.Constants';
import {apiWithToken} from '../../../ApiService/core/ApiRequest';
import {
  setUserData,
  setUserToken,
  userDataSelector,
  UserisUserAuthenticated,
} from '../../../Store/Data/Auth/AuthSlice';
import {useAppSelector} from '../../../Hooks/ReduxHooks';
import {store} from '../../../Store/Store';

const EmailVerification = ({
  route: {params},
}: NavigationProps<'EmailVerification'>) => {
  const [otp, setOtp] = React.useState('');
  const {token} = useAppSelector(userDataSelector);
  const otpVerify = () => {
    apiWithToken(
      ENDPOINTS.EmailOTPVerification,
      'POST',
      {
        otp: otp,
      },
      false,
      true,
    )
      .then(res => {
        // store.dispatch(setUserToken(res.token));
        console.log(res.token);
        setTimeout(() => {
          Register_Api(res.token);
        }, 1000);
      })
      .catch(err => {});
  };
  const Register_Api = (token: string) => {
    const data = {...params.data};
    apiWithToken(ENDPOINTS.Register, 'POST', data, false, true, token).then(
      res => {
        store.dispatch(setUserToken(res?.token));
        store.dispatch(setUserData(res?.data));
        store.dispatch(UserisUserAuthenticated(true));
      },
    );
  };

  return (
    <View style={styles.container}>
      <MyKeyboardAvoidingScrollView>
        <View
          style={[
            styles.innerContainer,
            {marginTop: useGetStatusBarHeight() + 100},
          ]}>
          <Image
            source={Images.Verify}
            resizeMode="contain"
            style={styles.image}
          />

          <Text style={styles.title}>Email Verification</Text>
          <Text style={styles.description}>
            Enter OTP Code sent to your email address {'\n'}
            <Text
              style={{
                fontFamily: Fonts.semiBold,
                color: Colors.black,
                fontSize: 14,
              }}>
              {params.email}
            </Text>
          </Text>

          <View style={{marginTop: 0, marginHorizontal: 0}}>
            <OTPInputView
              style={{
                width: '100%',
                height: 60,
                // alignSelf: 'center',
                // marginTop: 10,
                marginEnd: 32,
              }}
              keyboardAppearance="dark"
              keyboardType="number-pad"
              autoFocusOnLoad={true}
              pinCount={6}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={(code: any) => {
                console.log(`Code is ${code}, you are good to go!`);
                setOtp(code);
              }}
            />
          </View>
          <AuthButton
            title="Verify otp"
            mt={20}
            onPress={otpVerify}
            disabled={otp.length !== 6}
            textStyle={{
              color: otp.length === 6 ? Colors.white : Colors.gray,
            }}
            Mystyle={{
              backgroundColor: otp.length === 6 ? Colors.blue : '#cccc',
            }}
          />
        </View>
      </MyKeyboardAvoidingScrollView>
    </View>
  );
};

export default EmailVerification;

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
    width: moderateScale(100),
    height: moderateScale(100),
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
  underlineStyleBase: {
    width: width / 9,
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    color: Colors.black,

    height: width / 9,
    // marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',

    marginHorizontal: 2,
    alignSelf: 'center',

    borderRadius: width - 9,
    // borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: Colors.black,
    // top: 10,
    color: 'black',
    backgroundColor: '#fff',
  },
});
