import {I18nManager, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../../../../constants/Colors';
import NavHeader from '../../../../../components/Headers/NavHeader';
import MyKeyboardAvoidingScrollView from '../../../../../components/Scrollview/MyKeyboardAvoidingScrollView';
import LabelInputField from '../../../../../components/InputText/LableInputField';
import DropDown from '../../../../../components/DropDown';
import AuthButton from '../../../../../components/Button/AuthButton';
import {goBack} from '../../../../../Services/NavigationService';
import car_data from '../../../../../Josndata/car_type.json';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAP_API} from '../../../../../map/KeyMap';
import {
  DEVICE_TYPE,
  moderateScale,
  moderateScaleVertical,
  showToast,
} from '../../../../../constants/Utils';
import Fonts from '../../../../../constants/Fonts';
import {useFormik} from 'formik';
import BookingformSchema from '../../../../../utils/schema/Booking.schema';
import fetchNearbyDrivers from '../../../../../Firebase/FindDrivers';
import {apiWithToken} from '../../../../../ApiService/core/ApiRequest';
import {ENDPOINTS} from '../../../../../constants/API.Constants';
import LoadingIndicator from '../../../../../comman/LoadingIndicator';
import {t} from 'i18next';

const BookingRequirement = () => {
  const [pickLatitude, setPickLatitude] = useState<any>(22.9929455);
  const [pickLongitude, setPickLongitude] = useState<any>(72.543773);
  const [pickAddress, setPickAddress] = useState(
    'Vishala, Ahmedabad, Gujarat, India',
  );
  const [dropLatitude, setDropLatitude] = useState<any>(22.9962406);
  const [dropLongitude, setDropLongitude] = useState<any>(72.5817855);
  const [dropAddress, setDropAddress] = useState(
    'Danilimda, Ahmedabad, Gujarat, India',
  );
  const googlePlacesRef = React.useRef<GooglePlacesAutocompleteRef>(null);

  const formik = useFormik({
    initialValues: {
      car_type: '',
      full_name: '',
      total_passenger: '',
      phone_number: '',
      price: '',
    },
    validationSchema: BookingformSchema(),
    onSubmit: async values => {
      const distance = 100; // 10 km radius
      if (pickAddress && dropAddress) {
        LoadingIndicator.show();
        try {
          const driverIds = await fetchNearbyDrivers(
            pickLatitude,
            pickLongitude,
            distance,
          );
          if (driverIds?.length > 0) {
            const data = {
              ...values,
              total_passenger: parseInt(values.total_passenger),
              pick_up_adds: pickAddress,
              drop_of_adds: dropAddress,
              pick_up_lat: pickLatitude,
              pick_up_lng: pickLongitude,
              drop_of_lat: dropLatitude,
              drop_of_lng: dropLongitude,
              price: parseInt(values.price),
              driver_ids: driverIds?.map(i => parseInt(i.id)),
            };
            apiWithToken(ENDPOINTS.AddBooking, 'POST', data, true)
              .then(res => {
                showToast('Booking request sent successfully');
                goBack();
              })
              .finally(() => {
                LoadingIndicator.hide();
              });
          } else {
            LoadingIndicator.hide();
            showToast('No driver found nearby');
          }
        } catch (error) {
          LoadingIndicator.hide();
          showToast('Failed to send booking request');
        }
      } else {
        showToast('Please enter pickup and drop off address');
      }
    },
  });
  useEffect(() => {
    LoadingIndicator.hide();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      <NavHeader title={t('Booking Requirement')} />
      <MyKeyboardAvoidingScrollView
        style={{
          width: '90%',
          alignSelf: 'center',
        }}
        keyboardShouldPersistTaps="always">
        <LabelInputField
          label={t('Booking For')}
          placeholder={t('Full Name')}
          name="full_name"
          {...{formik}}
        />
        <LabelInputField
          label={t('Mobile Number')}
          placeholder={t('Mobile Number')}
          name="phone_number"
          TextInputProps={{
            keyboardType: 'numeric',
          }}
          {...{formik}}
        />
        <DropDown
          items={CarData}
          label={t('Car Type')}
          placeholder={t('Car Type')}
          name="car_type"
          value={formik.values.car_type}
          {...{formik}}
        />
        <View style={[{flexDirection: 'row', justifyContent: 'space-between'}]}>
          <Text
            style={[
              {
                fontFamily: Fonts.regular,
                fontSize: moderateScale(15),
                color: Colors.black,
              },
            ]}>
            {t('Pickup Address*')}
          </Text>
        </View>
        <View>
          <GooglePlacesAutocomplete
            placeholder={t('Pickup Address')}
            ref={googlePlacesRef}
            listViewDisplayed={false}
            onPress={(data, details) => {
              details && setPickAddress(details.formatted_address);
              details && setPickLatitude(details.geometry.location.lat);
              details && setPickLongitude(details.geometry.location.lng);
            }}
            query={{
              key: GOOGLE_MAP_API,
              language: 'en',
            }}
            GooglePlacesSearchQuery={{
              rankby: 'distance',
            }}
            styles={{
              listView: {
                borderWidth: 1,
                borderRadius: 5,
              },
              description: {
                color: Colors.black,
              },
            }}
            fetchDetails={true}
            textInputProps={{
              onChange(e) {
                setPickAddress(e.nativeEvent.text);
              },
              // onChangeText: text => setPickAddress(text),
              multiline: true,
              value: pickAddress,
              style: {
                borderRadius: moderateScale(37),
                width: '100%',
                textAlign: I18nManager.isRTL ? 'right' : 'left',
                ...styles.inputStyle,
              },
              placeholderTextColor: Colors.placeholder,
            }}
            onFail={error => console.log(error)}
            onNotFound={() => console.log('no results')}
            onTimeout={() => console.log('timeout')}
          />
        </View>
        <View style={[{flexDirection: 'row', justifyContent: 'space-between'}]}>
          <Text
            style={[
              {
                fontFamily: Fonts.regular,
                fontSize: moderateScale(15),
                color: Colors.black,
              },
            ]}>
            {t('Drop Off Address*')}
          </Text>
        </View>
        <View>
          <GooglePlacesAutocomplete
            placeholder={t('Drop Off Address')}
            ref={googlePlacesRef}
            listViewDisplayed={false}
            onPress={(data, details) => {
              details && setDropAddress(details.formatted_address);
              details && setDropLatitude(details.geometry.location.lat);
              details && setDropLongitude(details.geometry.location.lng);
            }}
            query={{
              key: GOOGLE_MAP_API,
              language: 'en',
            }}
            GooglePlacesSearchQuery={{
              rankby: 'distance',
            }}
            styles={{
              listView: {
                borderWidth: 1,
                borderRadius: 5,
              },
              description: {
                color: Colors.black,
              },
            }}
            fetchDetails={true}
            textInputProps={{
              onChange(e) {
                setPickAddress(e.nativeEvent.text);
              },
              multiline: true,
              value: dropAddress,
              style: {
                borderRadius: moderateScale(37),
                width: '100%',
                textAlign: I18nManager.isRTL ? 'right' : 'left',
                ...styles.inputStyle,
              },
              placeholderTextColor: Colors.placeholder,
            }}
            onFail={error => console.log(error)}
            onNotFound={() => console.log('no results')}
          />
        </View>
        <LabelInputField
          label={t('How Many Passengers?')}
          TextInputProps={{
            keyboardType: 'numeric',
            maxLength: 2,
          }}
          name="total_passenger"
          {...{formik}}
          placeholder={t('How Many Passengers?')}
        />
        <LabelInputField
          label={t('Booking Price')}
          TextInputProps={{
            keyboardType: 'numeric',
          }}
          name="price"
          {...{formik}}
          placeholder="$"
        />
        {/* <DropDown items={data} label="Car Type" placeholder="Car Type" /> */}
      </MyKeyboardAvoidingScrollView>
      <AuthButton title={t('Submit')} isbottom onPress={formik.handleSubmit} />
    </View>
  );
};

export default BookingRequirement;

const styles = StyleSheet.create({
  inputStyle: {
    fontFamily: Fonts.regular,
    flex: 1,
    color: '#1E1B1E',
    paddingVertical: DEVICE_TYPE == 'android' ? 8 : 15,
    fontSize: moderateScale(14),
    includeFontPadding: false,
    backgroundColor: '#F8F8F8',
    marginVertical: moderateScaleVertical(9),
    padding: DEVICE_TYPE == 'ios' ? 10 : 0,
    paddingHorizontal: moderateScale(15),
  },
});

export const CarData = car_data?.map(i => {
  return {label: i.english_type, value: i.id};
});
