import {
  Image,
  ImageSourcePropType,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import Images from '../../constants/Images';
import {medium, regular} from '../CustomFont/MyFont';
import AuthButton from '../Button/AuthButton';
type Props = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  img: any;
};
const ViewCertificateModal = ({visible, setVisible, img}: Props) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      transparent
      animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: '#000000db',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: 668,
            width: '90%',
            overflow: 'hidden',
            borderRadius: 10,
            zIndex: 0,
            backgroundColor: '#fff',
          }}>
          <Pressable
            onPress={() => {
              setVisible(false);
            }}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              zIndex: 1,
            }}>
            <Image
              source={Images.Close}
              style={{
                width: 30,
                height: 30,
              }}
            />
          </Pressable>
          <Image
            style={{
              width: '100%',
              height: 668,

              overflow: 'hidden',
              borderRadius: 10,
              alignSelf: 'center',
              backgroundColor: '#ccc',
            }}
            resizeMode="cover"
            source={{
              uri: img,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ViewCertificateModal;

const styles = StyleSheet.create({});
