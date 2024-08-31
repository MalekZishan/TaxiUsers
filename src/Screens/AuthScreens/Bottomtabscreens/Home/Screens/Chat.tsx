import {
  Image,
  ImageBackground,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useGetStatusBarHeight} from '../../../../../Hooks/dimentionHook';
import Images from '../../../../../constants/Images';
import Fonts from '../../../../../constants/Fonts';
import Colors from '../../../../../constants/Colors';
import {moderateScale, width} from '../../../../../constants/Utils';
import {goBack} from '../../../../../Services/NavigationService';
import {
  KeyboardAvoidingView,
  useGenericKeyboardHandler,
} from 'react-native-keyboard-controller';
import {FlatList} from 'react-native-gesture-handler';
import InputFields from '../../../../../components/InputText/InputFields';
import useKeyboardOffsetHeight from '../../../../../Hooks/useKeyboardOffsetHeight';

const Chat = () => {
  const height = useKeyboardOffsetHeight();
  console.log('🚀 ~ Chat ~ height:', height);
  let data = [
    {
      id: 1,
      name: 'John Doe',
      message: 'Hi, how are you?',
      time: '10:00 AM',
      type: 'user',
    },
    {
      id: 2,
      name: 'Admin',
      message: 'Hello, I am here to help you.',
      time: '10:05 AM',
      type: 'admin',
    },
    {
      id: 3,
      name: 'John Doe',
      message: 'What can I help you with?',
      time: '10:10 AM',
      type: 'user',
    },
    {
      id: 4,
      name: 'Admin',
      message:
        'Sure, I can help you with that. Please provide me with your contact information.',
      time: '10:15 AM',
      type: 'admin',
    },
    {
      id: 5,
      name: 'John Doe',
      message: 'Thank you for your information. I will contact you soon.',
      time: '10:20 AM',
      type: 'user',
    },

    {
      id: 6,
      name: 'Admin',
      message: 'I have sent a confirmation email to your provided information.',
      time: '10:25 AM',
      type: 'admin',
    },

    {
      id: 7,
      name: 'John Doe',
      message: 'Thank you for your confirmation. I will contact you soon.',
      time: '10:25 AM',
      type: 'user',
    },
    {
      id: 8,
      name: 'Admin',
      message: 'You have a new support ticket. Please check your inbox.',
      time: '10:30 AM',
      type: 'admin',
    },
    {
      id: 9,
      name: 'John Doe',
      message: 'You have a new support ticket. Please check your inbox.',
      time: '10:30 AM',
      type: 'user',
    },
  ];
  const ref = useRef<FlatList>(null);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        if (ref.current) {
          ref.current.scrollToEnd({animated: true});
        }
      },
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          shadowOffset: {
            width: 1,
            height: 1,
          },
          shadowColor: 'black',
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 3,
        }}>
        <View
          style={{
            // flexDirection: 'row',
            // marginTop: useGetStatusBarHeight(),
            alignItems: 'center',
            backgroundColor: '#ffff',
            // height: 100,
            paddingBottom: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: useGetStatusBarHeight(),
              width: '100%',
              justifyContent: 'center',
            }}>
            <Pressable
              onPress={() => {
                goBack();
                setTimeout(() => {
                  Keyboard.dismiss();
                }, 200);
              }}
              style={{
                position: 'absolute',
                left: 10,
                top: 3,
              }}>
              <Image
                source={Images.backArr}
                style={{
                  width: 24,
                  position: 'absolute',
                  left: 10,
                  height: 24,
                }}
              />
            </Pressable>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={Images.ProfilePi}
                style={{
                  width: 27,
                  height: 27,
                  marginStart: 10,
                }}
              />
              <Text
                style={{
                  fontFamily: Fonts.semiBold,
                  color: Colors.black,
                  fontSize: moderateScale(16),
                  marginStart: 10,
                }}>
                Brooklyn Simmons
              </Text>
            </View>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
        }}>
        <ImageBackground
          source={Images.ChatBG}
          style={{
            flex: 1,
          }}>
          <FlatList
            data={data}
            style={{
              paddingHorizontal: 20,
            }}
            ref={ref}
            renderItem={({item}) => {
              return item.type == 'user' ? (
                <UserSideChat data={item} />
              ) : (
                <AdminSideChat data={item} />
              );
            }}
          />
        </ImageBackground>

        <View
          style={{
            paddingHorizontal: 20,
            backgroundColor: '#fff',
            height: height == 0 ? 100 : undefined,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                flex: 1,
              }}>
              <InputFields
                placeholder="Write here.."
                rImg={Images.smile}
                style={{
                  height: 40,
                }}
                containerStyle={{
                  height: 40,
                }}
              />
            </View>
            <Pressable>
              <Image
                source={Images.send}
                style={{
                  width: 24,
                  marginStart: 10,
                  height: 24,
                }}
              />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Chat;

const AdminSideChat = (data: any) => {
  return (
    <View
      style={{
        marginVertical: 10,
        alignSelf: 'flex-start',
      }}>
      <View
        style={{
          flexDirection: 'row',
          // alignItems: 'center',
          maxWidth: width / 1.5,
        }}>
        <Image
          source={Images.pic}
          style={{
            width: 24,
            height: 24,
            borderRadius: 24,
            marginEnd: 10,
          }}
        />
        <View
          style={[
            styles.UserSideView,
            {
              backgroundColor: Colors.blue,
            },
          ]}>
          <Text
            style={{
              fontSize: 14,
              color: Colors.white,
              fontFamily: Fonts.semiBold,
            }}>
            {data.data.message}
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontSize: 12,
          color: Colors.gray,
          marginStart: 35,
          marginTop: 5,
          fontFamily: Fonts.regular,
        }}>
        {'08:00 pm'}
      </Text>
    </View>
  );
};

const UserSideChat = (data: any) => {
  return (
    <View
      style={{
        alignSelf: 'flex-end',
        marginVertical: 20,
      }}>
      <View
        style={{
          maxWidth: width / 1.5,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={styles.UserSideView}>
          <Text
            style={{
              fontSize: 14,
              color: Colors.black,
              fontFamily: Fonts.semiBold,
            }}>
            {data.data.message}
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontSize: 12,
          color: Colors.gray,
          marginTop: 5,
          fontFamily: Fonts.regular,
        }}>
        {'08:00 pm'}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  UserSideView: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    padding: 10,
    backgroundColor: '#F2F4FF',
  },
});
