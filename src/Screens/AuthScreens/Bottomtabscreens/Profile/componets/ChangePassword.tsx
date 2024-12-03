import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Styles} from '../../../../../constants/Utils';
import MyKeyboardAvoidingScrollView from '../../../../../components/Scrollview/MyKeyboardAvoidingScrollView';
import NavHeader from '../../../../../components/Headers/NavHeader';
import Images from '../../../../../constants/Images';
import InputFields from '../../../../../components/InputText/InputFields';
import AuthButton from '../../../../../components/Button/AuthButton';
import {changePassSchema} from '../../../../../utils/schema/Auth.schema';
import {ENDPOINTS} from '../../../../../constants/API.Constants';
import {goBack} from '../../../../../Services/NavigationService';
import {apiWithToken} from '../../../../../ApiService/core/ApiRequest';
import {useFormik} from 'formik';

const ChangePassword = () => {
  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      apiWithToken(ENDPOINTS.ChangePassword, 'PUT', {
        old_password: values.oldPassword,
        new_password: values.newPassword,
      })
        .then(res => {
          goBack();
        })
        .catch(err => {
          console.log(
            '🚀 ~ file: UserRegister.tsx:36 ~ apiWithToken ~ err:',
            err.response.data,
          );
        });
    },
    validationSchema: changePassSchema,
  });

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
            {...{formik}}
            name="oldPassword"
            rImg={Images.eye_open}
          />
          <InputFields
            placeholder="New Password"
            rImg={Images.eye_open}
            {...{formik}}
            lImg={Images.Password}
            name={'newPassword'}
          />
          <InputFields
            placeholder="Confirm New Password"
            lImg={Images.Password}
            {...{formik}}
            name={'confirmPassword'}
          />
        </View>
      </MyKeyboardAvoidingScrollView>

      <AuthButton
        title="Reset Password"
        isbottom
        onPress={() => {
          formik.handleSubmit();
        }}
      />
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
