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
import {CIRCLE, moderateScale, width} from '../../../../../constants/Utils';
import {goBack} from '../../../../../Services/NavigationService';
import {KeyboardAvoidingView} from 'react-native-keyboard-controller';
import {FlatList} from 'react-native-gesture-handler';
import InputFields from '../../../../../components/InputText/InputFields';
import useKeyboardOffsetHeight from '../../../../../Hooks/useKeyboardOffsetHeight';
import {NavigationProps} from '../../../../../Models/Navigation/NavigationModels';
import {imgSrc} from '../../../../../ApiService/core/ApiRequest';

import moment from 'moment';
import {
  chatCollectionByRoomID,
  onSend,
} from '../../../../../Firebase/chatServices';
import {messageType} from '../../../../../Models/Chat/messageService';
import {useAppSelector} from '../../../../../Hooks/ReduxHooks';
import {userDataSelector} from '../../../../../Store/Data/Auth/AuthSlice';

const Chat = ({navigation, route}: NavigationProps<'Chat'>) => {
  const [message, setMessage] = React.useState('');
  const [chats, setChats] = React.useState<messageType[]>([]);
  const routeData = route.params;
  const height = useKeyboardOffsetHeight();
  const senderId = String(useAppSelector(userDataSelector).data?.id);
  const receiverId = String(routeData?.id);
  // Here roomId is the id of the booking
  const roomId = String(routeData?.id);

  const ref = useRef<FlatList>(null);
  useEffect(() => {
    chatCollectionByRoomID(roomId)
      .orderBy('createdAt', 'desc')
      .onSnapshot(snap => {
        const data = snap.docs.map(doc => doc.data());
        setChats(data as messageType[]);
      });
    const unsubScribe = chatCollectionByRoomID(roomId)
      .where('isRead', '==', false)
      .where('senderId', '==', receiverId)
      .onSnapshot(snap => {
        snap.docs.forEach(doc => {
          doc.ref.update({isRead: true});
        });
      });
    return () => unsubScribe();
  }, []);
  const handleSend = () => {
    // Here senderId is the id of the user who is sending the message
    // receiverId is the id of the booking who is receiving the message
    const commonData = {
      senderId: senderId,
      receiverId: receiverId,
      createdAt: new Date().getTime(),
      isRead: false,
      msgId: `${Math.random()}`,
    };
    if (message) {
      onSend(
        {
          message: message,
          ...commonData,
        },
        roomId,
      );
    }
    setMessage('');
  };
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
            alignItems: 'center',
            backgroundColor: '#ffff',
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
                source={{uri: imgSrc(routeData?.driver_detail?.profile_pic)}}
                style={[CIRCLE(30)]}
              />
              <Text
                style={{
                  fontFamily: Fonts.semiBold,
                  color: Colors.black,
                  fontSize: moderateScale(16),
                  marginStart: 10,
                }}>
                {routeData?.full_name}
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
            data={chats}
            style={{
              paddingHorizontal: 20,
            }}
            inverted
            ref={ref}
            renderItem={({item}) => {
              return item.senderId == senderId ? (
                <>
                  <UserSideChat {...item} />
                </>
              ) : (
                <>
                  <AdminSideChat
                    {...item}
                    image={routeData?.driver_detail?.profile_pic}
                  />
                </>
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
                value={message}
                onChangeText={setMessage}
                containerStyle={{
                  height: 40,
                }}
              />
            </View>
            <Pressable onPress={handleSend}>
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

interface othserSideChatProps extends messageType {
  image: string;
}

const AdminSideChat = (data: othserSideChatProps) => {
  return (
    <View
      style={{
        marginVertical: 10,
        alignSelf: 'flex-start',
      }}>
      <View
        style={{
          flexDirection: 'row',
          maxWidth: width / 1.5,
        }}>
        <Image
          source={{uri: imgSrc(data.image)}}
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
            {data.message}
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
        {data?.createdAt && moment(data?.createdAt).format('hh:mm A')}
      </Text>
    </View>
  );
};

interface mySideChatProps extends messageType {}
const UserSideChat = (data: mySideChatProps) => {
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
            {data?.message}
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
        {data?.createdAt && moment(data?.createdAt).format('hh:mm A')}
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
