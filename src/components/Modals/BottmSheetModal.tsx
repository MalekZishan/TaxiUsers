import {
  Image,
  ImageSourcePropType,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Dispatch, ReactNode, SetStateAction, useEffect, useState} from 'react';
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
  children?: ReactNode;
  bottomSheetVisibleModal: boolean;
  rectangle?: boolean;
  setBottomSheetVisibleModal: Dispatch<SetStateAction<boolean>>;
};

export const BottmSheetModal = ({
  bottomSheetVisibleModal,
  setBottomSheetVisibleModal,
  children,
}: BottomSheetImgPropType) => {
  return (
    <Modal
      statusBarTranslucent
      deviceHeight={HEIGHT}
      useNativeDriver
      style={{
        justifyContent: 'center',
        margin: 0,
      }}
      animationIn={'fadeInUp'}
      isVisible={bottomSheetVisibleModal}
      animationInTiming={500}
      animationOutTiming={1000}
      hardwareAccelerated>
      <Pressable
        onPress={() => setBottomSheetVisibleModal(false)}
        style={{
          justifyContent: 'flex-end',
          flex: 1,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            justifyContent: 'flex-end',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingBottom: 30,

            paddingHorizontal: 20,
          }}>
          <View style={styles.line} />
          {children}
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
  line: {
    width: 33,
    height: 5,
    borderRadius: 23,
    backgroundColor: '#D9D9D9',
    alignSelf: 'center',
    marginTop: 10,
  },
});
