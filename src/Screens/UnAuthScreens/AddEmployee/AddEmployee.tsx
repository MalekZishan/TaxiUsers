import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import NavHeader from '../../../components/Headers/NavHeader';
import Colors from '../../../constants/Colors';
import MyKeyboardAvoidingScrollView from '../../../components/Scrollview/MyKeyboardAvoidingScrollView';
import AvatarImg from '../../../components/Layouts/AvatarImg';
import {moderateScale} from '../../../constants/Utils';
import AuthButton from '../../../components/Button/AuthButton';
import LabelInputField from '../../../components/InputText/LableInputField';
import Images from '../../../constants/Images';
import {useFormik} from 'formik';
import {AddEmployeeSchema} from '../../../utils/schema/Employee.schema';
import {apiWithToken} from '../../../ApiService/core/ApiRequest';
import {ENDPOINTS} from '../../../constants/API.Constants';
import {store} from '../../../Store/Store';
import {updateUserData} from '../../../Store/Data/Auth/AuthSlice';
import {goBack} from '../../../Services/NavigationService';

type Props = {};

const AddEmployee = (props: Props) => {
  const formik = useFormik({
    initialValues: {
      full_name: '',
      phone_number: '',
      email: '',
      password: '',
    },
    validationSchema: AddEmployeeSchema,
    onSubmit: values => {
      apiWithToken(
        ENDPOINTS.AddEmployee,
        'POST',
        {...values},
        false,
        true,
      ).then(res => {
        store.dispatch(updateUserData(res.data));
        goBack();
      });
      console.log(values);
    },
  });
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
        }}>
        <NavHeader title="Add Employee" />
        <MyKeyboardAvoidingScrollView
          style={{
            paddingHorizontal: 20,
          }}>
          <AvatarImg defaultSource={''} />
          <View>
            <LabelInputField
              placeholder="Full Name"
              label="Full Name"
              name="full_name"
              {...{formik}}
            />
            <LabelInputField
              placeholder="Mobile Number"
              label="Mobile Number"
              {...{formik}}
              name="phone_number"
              keyboardType="numeric"
            />
            <LabelInputField
              placeholder="Email Address"
              label="Email Address"
              {...{formik}}
              name="email"
              keyboardType="email-address"
            />
            <LabelInputField
              placeholder="Password"
              label="Password"
              lImg={Images.Password}
              rImg={Images.eye_close}
              {...{formik}}
              name="password"
            />
          </View>
        </MyKeyboardAvoidingScrollView>
        <AuthButton title="Save" isbottom onPress={formik.handleSubmit} />
      </View>
    </>
  );
};

export default AddEmployee;

const styles = StyleSheet.create({});
