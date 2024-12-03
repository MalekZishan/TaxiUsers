import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  F,
  HEIGHT,
  SQUARE,
  Styles,
  WIDTH,
  moderateScale,
} from '../../constants/Utils';
import Images from '../../constants/Images';
import LabelInputField from '../InputText/LableInputField';
import PrimaryBtn from '../Button/PrimaryBtn';
import Fonts from '../../constants/Fonts';
import RatingSelector from '../Ratings/RatingSelector';
import {semiBold} from '../CustomFont/MyFont';
import Colors from '../../constants/Colors';
import AuthButton from '../Button/AuthButton';
import {Detailsmodal} from '../../Models/Home/Home.modal';
import {apiWithToken, imgSrc} from '../../ApiService/core/ApiRequest';
import MyKeyboardAvoidingScrollView from '../Scrollview/MyKeyboardAvoidingScrollView';
import {PastBoookingResponse} from '../../Models/Booking/booking.modal';
import {ENDPOINTS} from '../../constants/API.Constants';

type Props = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  data: PastBoookingResponse;
  callback: ({rate}: {rate: number}) => void;
};

const RatingModal = ({visible, setVisible, data, callback}: Props) => {
  const [selectedRating, setSelectedRating] = useState(-1);
  const [review, setReview] = useState('');
  const [loadng, setLoadng] = useState(false);

  const Scale = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: Scale.value}],
    };
  });

  if (visible) {
    Scale.value = withSpring(1);
  }

  useEffect(() => {
    if (!visible) return;
    setSelectedRating(-1);
    setReview('');
    setLoadng(false);
  }, [visible]);

  const onSubmit = () => {
    if (selectedRating == -1) {
      return;
    }
    setLoadng(true);
    const submitData = {
      booking_id: data?.id + '', // required
      rate: selectedRating.toFixed(2), // required
      details: review, // optional
    };
    apiWithToken(ENDPOINTS.RateDriver, 'POST', submitData, true, true)
      .then(res => {
        callback({rate: selectedRating});
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoadng(false));
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      transparent>
      <StatusBar
        backgroundColor={Colors.black}
        barStyle={'dark-content'}
        translucent
      />
      <MyKeyboardAvoidingScrollView
        // onPress={() => setVisible(false)}

        style={{
          backgroundColor: '#000000db',
          padding: moderateScale(10),
          paddingTop: moderateScale(10),
          flex: 1,
        }}>
        <Animated.View
          style={{
            ...Styles.centerDivWithFlex,
          }}>
          <View style={styles.container}>
            <Text
              style={[
                semiBold(moderateScale(21)),
                {
                  alignSelf: 'center',
                },
              ]}>
              {'Rate Driver'}
            </Text>

            <Pressable
              style={{position: 'absolute', right: 10, top: 10, zIndex: 999}}
              onPress={() => {
                Scale.value = withSpring(0);
                setTimeout(() => {
                  setVisible(false);
                }, 200);
              }}>
              <Image
                source={Images.close}
                resizeMode="contain"
                style={SQUARE(F(25))}
              />
            </Pressable>

            {/* profileImage */}
            <View
              style={{
                borderRadius: WIDTH,
                overflow: 'hidden',
                ...Styles.centerDiv,
                marginTop: moderateScale(15),
              }}>
              <Image
                source={{uri: imgSrc(data?.driver_detail?.profile_pic)}}
                style={{
                  width: moderateScale(96),
                  borderRadius: moderateScale(96),
                  backgroundColor: '#ccc',
                  height: moderateScale(96),
                }}
              />
            </View>

            {/* name  */}
            <Text
              style={{
                fontFamily: Fonts.semiBold,
                alignSelf: 'center',
                marginTop: 8,
                color: Colors.black,
              }}>
              {data?.driver_detail?.full_name}
            </Text>

            <Pressable
              style={{
                alignSelf: 'center',
                alignItems: 'center',
                marginTop: 15,
                flexDirection: 'row',
                borderRadius: 48,
                backgroundColor: '#EAF1FF',
                width: moderateScale(119),
                height: moderateScale(46),
                justifyContent: 'center',
              }}
              onPress={() => {
                Linking.openURL(`tel:${data?.driver_detail?.phone_number}`);
              }}>
              <Image
                source={Images.phone}
                style={{
                  width: moderateScale(20),
                  height: moderateScale(20),
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  fontFamily: Fonts.bold,
                  fontSize: 14,
                  color: Colors.blue,
                  marginLeft: 20,
                }}>
                Call
              </Text>
            </Pressable>
            <RatingSelector
              selectedRating={selectedRating}
              onPress={val => setSelectedRating(val)}
            />

            <LabelInputField
              placeholder={'Write a Review'}
              label={'Write a Review'}
              value={review}
              containerStyle={{
                height: moderateScale(125),
                borderRadius: 8,
                backgroundColor: '#F8F8F8',
                overflow: 'hidden',
              }}
              TextInputProps={{
                multiline: true,
                style: {
                  height: moderateScale(Platform.OS == 'android' ? 125 : 90),
                  borderRadius: 1,

                  overflow: 'hidden',
                  textAlignVertical: 'top',
                },
              }}
              onChangeText={setReview}
            />

            <View style={{margin: 8, top: 100}}>
              {loadng ? (
                <ActivityIndicator size="large" color={Colors.blue} />
              ) : (
                <AuthButton title="Submit" onPress={onSubmit} />
              )}
            </View>
          </View>
        </Animated.View>
      </MyKeyboardAvoidingScrollView>
    </Modal>
  );
};

export default RatingModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    width: WIDTH - 30,
    margin: 15,
    paddingBottom: 100,
    borderRadius: 10,
    overflow: 'hidden',
  },
  headingFont: {
    ...Styles.heading,
    fontFamily: Fonts.semiBold,
    fontSize: moderateScale(15),
    textAlign: 'center',
    marginTop: 20,
  },
});
