import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
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
  height,
  moderateScale,
} from '../../constants/Utils';
import Images from '../../constants/Images';
import LabelInputField from '../InputText/LableInputField';
import PrimaryBtn from '../Button/PrimaryBtn';
import Fonts from '../../constants/Fonts';
import RatingSelector from '../Ratings/RatingSelector';

import {useGetStatusBarHeight} from '../../Hooks/dimentionHook';
import Colors from '../../constants/Colors';
import ProgressDialog from './ProgressDIalog';
import {navigate} from '../../Services/NavigationService';

type Props = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  Userid?: string;
  OnEditChat?: () => void;
  OnDeltedChat?: () => void;
  Isblock?: number;
  OnBlockusers?: () => void;
};

export const UserModalChatModal = ({
  visible,
  setVisible,
  OnDeltedChat,
  OnEditChat,
}: Props) => {
  const Scale = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: Scale.value}],
    };
  });

  if (visible) {
    Scale.value = withSpring(1);
  }

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
          backgroundColor: '#00000068',
          // ...Styles.centerDivWithFlex,
          padding: moderateScale(10),
          paddingTop: moderateScale(10),
          flex: 1,
        }}>
        <Animated.View
          style={[
            rStyle,
            {
              flex: 1,
            },
          ]}>
          <Animated.View
            style={{
              height: '90%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                // alignItems: 'center',
                width: '90%',

                flexDirection: 'row',
                padding: 20,
                // width: 100,
                height: 100,
                paddingHorizontal: 15,
                borderTopLeftRadius: 20,
                justifyContent: 'space-between',
                borderBottomRightRadius: 20,
                // borderTopLeftRadius:20,
                alignItems: 'center',

                // justifyContent: 'center'
              }}>
              <Pressable
                onPress={() => {
                  Scale.value = withSpring(0);
                  setTimeout(() => {
                    setVisible(false);
                  }, 200);
                }}
                style={{
                  position: 'absolute',
                  top: 5,
                  right: 10,
                }}>
                <Image
                  source={Images.Close}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </Pressable>
              <Pressable
                onPress={OnEditChat}
                style={{
                  flexDirection: 'row',
                  marginTop: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  width: '45%',

                  height: 40,
                  backgroundColor: Colors.Green,
                }}>
                <Image
                  source={Images.edit_ProfileG}
                  style={{
                    marginEnd: 10,
                    width: 24,
                    tintColor: '#fff',
                    height: 24,
                  }}
                />
                <Text
                  style={{
                    fontFamily: Fonts.semiBold,
                    color: '#fff',
                    fontSize: 14,
                  }}>
                  Edit Chat
                </Text>
              </Pressable>
              <Pressable
                onPress={OnDeltedChat}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  marginTop: 15,
                  width: '45%',

                  paddingHorizontal: 15,
                  height: 40,

                  backgroundColor: Colors.LightGreen,
                }}>
                <Image
                  source={Images.delete}
                  style={{
                    marginEnd: 10,
                    width: 24,
                    tintColor: '#fff',
                    height: 24,
                  }}
                />
                <Text
                  style={{
                    fontFamily: Fonts.semiBold,
                    color: '#fff',

                    flex: 1,
                  }}>
                  Delete Chat
                </Text>
              </Pressable>
            </View>
          </Animated.View>

          {/* profileImage */}
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default UserModalChatModal;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: WIDTH - 5,
    margin: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  headingFont: {
    ...Styles.heading,
    fontFamily: Fonts.bold,
    fontSize: moderateScale(20),
    textAlign: 'center',
  },
});
