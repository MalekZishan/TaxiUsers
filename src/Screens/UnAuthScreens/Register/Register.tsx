import {Image, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../../constants/Colors';
import MyKeyboardAvoidingScrollView from '../../../components/Scrollview/MyKeyboardAvoidingScrollView';
import Fonts from '../../../constants/Fonts';
import {moderateScale} from '../../../constants/Utils';
import Images from '../../../constants/Images';
import {useGetStatusBarHeight} from '../../../Hooks/dimentionHook';
import LabelInputField from '../../../components/InputText/LableInputField';
import AuthButton from '../../../components/Button/AuthButton';
import NavigationText from '../../../components/Text/NavigationText';
import {goBack, navigate} from '../../../Services/NavigationService';
import {store} from '../../../Store/Store';
import {setUserToken} from '../../../Store/Data/Auth/AuthSlice';
import {useFormik} from 'formik';
import {apiWithToken} from '../../../ApiService/core/ApiRequest';
import {ENDPOINTS} from '../../../constants/API.Constants';
import {registerSchema} from '../../../utils/schema/Auth.schema';

const Register = () => {
  //for the formik
  const initialValues = {
    full_name: '',
    phone_number: '',
    company_name: '',
    email: '',
    password: '',
  };
  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      const data = {
        full_name: values.full_name, // required character min 3, max 40
        phone_number: values.phone_number, // required  character min 3, max 40
        company_name: values?.company_name, // required  character min 2, max 80 this will be json file
        email: values?.email, // required  character min 3, max 300
        password: values?.password, // required  character min 5, max 20
        device_type: Platform.OS === 'ios' ? '2' : '1',
        device_token: 'tokenasads', // optional
      };
      apiWithToken(ENDPOINTS.VerifyEmail, 'POST', {
        email: values.email,
      }).then(res => {
        store.dispatch(setUserToken(res.token));
        navigate('EmailVerification', {
          email: values.email,
          data: data,
        });
        // store.dispatch(setUserToken(res));
      });

      // apiWithToken(ENDPOINTS.login, 'POST', data)
      //   .then(res => {})
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    validationSchema: registerSchema,
  });
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
        <Pressable
          onPress={() => {
            goBack();
          }}>
          <Image
            source={Images.backArr}
            style={{
              width: 24,
              height: 24,
              tintColor: Colors.black,
            }}
          />
        </Pressable>
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
          <LabelInputField
            label="Full Name"
            placeholder="Full Name"
            name="full_name"
            {...{formik}}
          />
          <LabelInputField
            label="Company Name"
            placeholder="Company Name"
            name="company_name"
            {...{formik}}
          />
          <LabelInputField
            label="Mobile Number"
            placeholder="Mobile Number"
            name="phone_number"
            TextInputProps={{keyboardType: 'phone-pad'}}
            {...{formik}}
          />
          <LabelInputField
            label="Email Address"
            placeholder="Email Address"
            keyboardType="email-address"
            name="email"
            {...{formik}}
          />
          <LabelInputField
            label="Create Password"
            placeholder="Password"
            rImg={Images.eye_close}
            name="password"
            secureTextEntry={true}
            {...{formik}}
          />
          <AuthButton
            title="Register"
            mt={20}
            Mystyle={{
              marginBottom: 20,
            }}
            onPress={() => {
              formik.handleSubmit();
            }}
          />
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
