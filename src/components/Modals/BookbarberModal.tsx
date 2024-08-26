import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Pressable,
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
import AuthButton from '../Button/AuthButton';
import MyKeyboardAvoidingScrollView from '../Scrollview/MyKeyboardAvoidingScrollView';
import Colors from '../../constants/Colors';
import {store} from '../../Store/Store';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {regular, semiBold} from '../CustomFont/MyFont';
import {setAuthentication} from '../../Store/Data/Auth/AuthSlice';

type Props = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

const BookbarberModal = ({visible, setVisible}: Props) => {
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
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      transparent>
      <Pressable
        onPress={onSubmit}
        style={{
          backgroundColor: '#000000db',
          ...Styles.centerDivWithFlex,
          padding: moderateScale(10),
          paddingTop: moderateScale(10),
        }}>
        <Animated.View style={rStyle}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior="position"
            keyboardVerticalOffset={200}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={Images.barberlog}
                style={{
                  width: 63,
                  height: 63,
                  alignSelf: 'center',
                  marginTop: moderateScale(20),
                }}
              />
              <Text style={semiBold(20)}>Book a Barber</Text>
              <Text
                style={[
                  regular(12, '#616569'),
                  {
                    textAlign: 'center',
                  },
                ]}>
                Your request is sent. Wait a while for barber responce nearr
                you.
              </Text>
              <AuthButton
                onPress={onSubmit}
                title="OK"
                Mystyle={{
                  height: 40,
                  width: 136,
                  marginTop: 15,
                }}
              />
            </View>
          </KeyboardAvoidingView>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default BookbarberModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    width: WIDTH - 40,
    margin: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  headingFont: {
    ...Styles.heading,
    fontFamily: Fonts.bold,
    fontSize: moderateScale(20),
    textAlign: 'center',
  },
});
