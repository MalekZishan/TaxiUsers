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
                semiBold(21),
                {
                  alignSelf: 'center',
                },
              ]}>
              {'Rate Now'}
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
                source={Images.Close}
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
                source={{
                  uri: data?.teaImage,
                }}
                style={{
                  width: 83,
                  borderRadius: 5,
                  backgroundColor: '#ccc',
                  height: 83,
                }}
              />
            </View>

            {/* name  */}
            <Text style={{...styles.headingFont, fontSize: moderateScale(15)}}>
              {data?.teaName}
            </Text>

            <RatingSelector
              selectedRating={selectedRating}
              onPress={val => setSelectedRating(val)}
            />

            <LabelInputField
              placeholder={'Write here'}
              label={'Review'}
              value={review}
              containerStyle={{
                height: moderateScale(125),

                borderRadius: 8,
              }}
              TextInputProps={{
                maxLength: 135,
                multiline: true,
                style: {
                  height: moderateScale(Platform.OS == 'android' ? 125 : 90),
                  borderRadius: 8,
                  textAlignVertical: 'top',
                },
              }}
              onChangeText={setReview}
            />

            <View style={{margin: 8, top: 100}}>
              {/* <AuthButton title="Submit" onPress={onSubmit} /> */}
              <PrimaryBtn
                title={'Submit'}
                pdVr={13}
                borderRadius={10}
                bgColor={Colors.yellow}
                onPress={onSubmit}
                isDisabled={!selectedRating || !review.trim()}
              />
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
