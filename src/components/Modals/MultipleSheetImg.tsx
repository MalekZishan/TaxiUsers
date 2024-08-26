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
import ImageCropPicker, {ImageOrVideo} from 'react-native-image-crop-picker';

type BottomSheetImgPropType = {
  bottomSheetVisible: boolean;
  rectangle?: true;
  setBottomSheetVisible: Dispatch<SetStateAction<boolean>>;
  setUserProfileImage: React.Dispatch<React.SetStateAction<any[]>>;
  ImageData: any[];
};

export const MultipleSheetImg = ({
  bottomSheetVisible,
  setBottomSheetVisible,
  setUserProfileImage,
  rectangle,
  ImageData,
}: BottomSheetImgPropType) => {
  const [visible, setVisible] = useState(false);
  const [isCamera, setIsCamera] = useState(false);

  const choosefromGallary = async () => {
    ImageCropPicker.openPicker({
      multiple: true,
    }).then((image: any) => {
      // setUserProfileImage((data: any) => {
      //   return [...data, image];
      // });
      setUserProfileImage([...ImageData, ...image]);
      setBottomSheetVisible(false);
    });
    // ImageCropPicker.openPicker({
    //   width: 300,
    //   height: 400,
    //   cropping: true,
    //   multiple: true,
    // }).then(imgs => {
    //   if (imgs.length <= 45) {
    //     setUserProfileImage([...images, ...imgs]);
    //   } else {
    //     setImages([...images]);
    //     ToastAndroid.show('Maximum of 45 images allowed', ToastAndroid.SHORT);
    //   }
    // });
  };

  const choosefromCamera = async () => {
    getImage('camera', rectangle)
      .then(res => {
        const uri = {uri: res.path};
        setBottomSheetVisible(false);
        // setUserProfileImage(uri);
      })
      .catch(err => {
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
  const text = `Allow Trim it Moooving to access this device ${
    isCamera ? 'camera' : 'gallery'
  } Permission?`;
  const Img = isCamera ? Images.Camera : Images.gallery_ic;

  return (
    <Modal
      statusBarTranslucent
      deviceHeight={HEIGHT}
      style={{
        justifyContent: 'center',
        margin: 0,
      }}
      animationIn={'fadeInUp'}
      isVisible={bottomSheetVisible}
      animationInTiming={500}
      animationOutTiming={1000}
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
          <Text
            style={{
              fontFamily: Fonts.bold,
              fontSize: 15,
              color: 'black',
              paddingVertical: 15,
            }}>
            Upload Work Photos
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
                  style={[{...SQUARE(WIDTH / 11)}, {}]}
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
    fontFamily: Fonts.medium,
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
          tintColor: 'white',
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
