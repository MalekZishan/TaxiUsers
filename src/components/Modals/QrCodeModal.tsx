import {Image, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import Images from '../../constants/Images';
type Props = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  img: any;
};
const QrCodeModal = ({visible, setVisible, img}: Props) => {
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
        <Image
          source={{
            uri: img,
          }}
          resizeMode="contain"
          style={{
            width: '100%',
            borderRadius: 10,
            overflow: 'hidden',
            height: 369,
          }}
        />
        <Pressable onPress={() => setVisible(false)}>
          <Image
            source={Images.Close}
            style={{
              height: 51,
              marginTop: 20,
              width: 51,
            }}
          />
        </Pressable>
      </View>
    </Modal>
  );
};

export default QrCodeModal;

const styles = StyleSheet.create({});
