import {
  Image,
  ImageSourcePropType,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {getImage} from '../../Services/PermissionsServices';
import Images from '../../constants/Images';
import Fonts from '../../constants/Fonts';
import {
  HEIGHT,
  SQUARE,
  Styles,
  WIDTH,
  height,
  moderateScaleVertical,
} from '../../constants/Utils';
import Colors from '../../constants/Colors';
import Popup from './Popup';
import Modal from 'react-native-modal';

type BottomSheetImgPropType = {
  bottomSheetVisible: boolean;
  rectangle?: boolean;
  setBottomSheetVisible: Dispatch<SetStateAction<boolean>>;
  setUserProfileImage: Dispatch<SetStateAction<any>>;
};

export const BottomSheetImg = ({
  bottomSheetVisible,
  setBottomSheetVisible,
  setUserProfileImage,
  rectangle,
}: BottomSheetImgPropType) => {
  const [visible, setVisible] = useState(false);
  const [isCamera, setIsCamera] = useState(false);

  const choosefromGallary = async () => {
    getImage('gallery', rectangle)
      .then(res => {
        console.log(res.mime);
        const uri = {uri: res.path};
        setBottomSheetVisible(false);
        setUserProfileImage(res.path);
      })
      .catch(err => {
        console.log('🚀 ~ choosefromGallary ~ err:', err);
        if (
          err == 'Error: User did not grant library permission.' ||
          'blocked'
        ) {
          setIsCamera(false);
          setVisible(true);
        }
      });
  };

  const choosefromCamera = async () => {
    getImage('camera', rectangle)
      .then(res => {
        const uri = {uri: res.path};
        setBottomSheetVisible(false);
        setUserProfileImage(uri);
      })
      .catch(err => {
        console.log('🚀 ~ choosefromCamera ~ err:', err);

        if (err == 'blocked') {
          setIsCamera(true);
          setVisible(true);
        }
      });
  };

  const onAllowPress = () => {
    Linking.openSettings();
  };

  const headingText = 'Allow Permission';
  const text = `Allow  Gocyc to access this device ${
    isCamera ? 'camera' : 'gallery'
  } Permission?`;
  const Img = isCamera ? Images.Camera : Images.gallery_ic;
  const togglemodal = () => {
    // setVisible(!visible);
    setBottomSheetVisible(!bottomSheetVisible);
  };
  return (
    <Modal
      onBackdropPress={() => setVisible(false)}
      onBackButtonPress={() => setVisible(false)}
      isVisible={bottomSheetVisible}
      swipeDirection="down"
      onSwipeComplete={togglemodal}
      animationIn="slideInUp"
      avoidKeyboard
      animationInTiming={900}
      statusBarTranslucent
      style={{
        justifyContent: 'flex-end',
        margin: 0,
      }}
      animationOutTiming={500}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={500}
      hardwareAccelerated>
      <PermissionPopup
        {...{visible, setVisible, headingText, text, Img, onAllowPress}}
      />

      <Pressable
        onPress={() => setBottomSheetVisible(false)}
        style={{
          justifyContent: 'flex-end',
          flex: 1,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            justifyContent: 'flex-end',
            borderRadius: 10,
            paddingBottom: 30,
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              height: 5,
              width: 30,
              borderRadius: 5,
              marginTop: 10,
              alignSelf: 'center',
              backgroundColor: '#ccc',
            }}
          />
          <Text
            style={{
              fontFamily: Fonts.THICCCBOIBold,
              fontSize: 15,
              color: 'black',
              paddingVertical: 15,
            }}>
            Upload Photo
          </Text>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Pressable
                onPress={choosefromCamera}
                style={{
                  marginHorizontal: 10,
                  ...SQUARE(WIDTH / 6),
                  borderColor: Colors.black,

                  padding: 10,
                  borderRadius: 100,
                  borderWidth: 1,
                  ...Styles.centerDiv,
                }}>
                <Image source={Images.Camera} style={{...SQUARE(WIDTH / 11)}} />
              </Pressable>
              <Text style={styles.text2}>Camera</Text>
            </View>

            <View>
              <Pressable
                onPress={choosefromGallary}
                style={{
                  marginHorizontal: 10,
                  ...SQUARE(WIDTH / 6),
                  borderRadius: 100,
                  ...Styles.centerDiv,
                  borderWidth: 1,
                  borderColor: Colors.black,
                }}>
                <Image
                  source={Images.gallery_ic}
                  style={[
                    {...SQUARE(WIDTH / 11)},
                    {
                      tintColor: Colors.green,
                    },
                  ]}
                />
              </Pressable>
              <Text style={styles.text2}>Gallery</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};
const styles = StyleSheet.create({
  text2: {
    fontFamily: Fonts.THICCCBOISEMIBOLD,
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
});

type PermissionPopupPropType = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  headingText?: string;
  text?: string;
  Img?: ImageSourcePropType;
  onAllowPress?: () => void;
};

export const PermissionPopup = ({
  visible,
  setVisible,
  Img,
  headingText,
  text,
  onAllowPress,
}: PermissionPopupPropType) => {
  return (
    <Popup
      {...{visible, setVisible, Img, headingText, text}}
      ImgProps={{
        resizeMode: 'contain',
        style: {
          marginTop: moderateScaleVertical(10),
          borderRadius: 0,
        },
      }}
      BtnContainerStyle={{
        flexDirection: 'column',
        width: '100%',
      }}
      outerBtnStyle={{flex: undefined, width: '100%', maxWidth: undefined}}
      Btns={[
        {title: 'Open Settings', onPress: onAllowPress},
        {title: 'Deny', borderStyleBtn: 'white'},
      ]}
    />
  );
};
