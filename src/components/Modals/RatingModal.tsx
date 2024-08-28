import {
  Image,
  KeyboardAvoidingView,
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
import {apiWithToken} from '../../ApiService/core/ApiRequest';
import MyKeyboardAvoidingScrollView from '../Scrollview/MyKeyboardAvoidingScrollView';

type Props = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  data?: Detailsmodal;
  callback: () => void;
};

const RatingModal = ({visible, setVisible, data, callback}: Props) => {
  const [selectedRating, setSelectedRating] = useState(-1);
  const [review, setReview] = useState('');

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
  }, [visible]);

  const onSubmit = () => {
    Scale.value = withSpring(0);
    setTimeout(() => {
      setVisible(false);
    }, 200);
    console.log(data?.id);
    apiWithToken('user/review/add-review', 'POST', {
      teaId: data?.id,
      review: review,
      rating: selectedRating + 1,
    })
      .then(res => {
        console.log(res);
        callback();
      })
      .catch(err => {
        console.log(err);
      });
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
                source={Images.pic}
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
              Jordan Ball
            </Text>

            <View
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
            </View>
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
              {/* <AuthButton title="Submit" onPress={onSubmit} /> */}
              <AuthButton title="Submit" />
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
