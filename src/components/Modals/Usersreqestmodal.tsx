import {Image, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {moderateScale} from '../../constants/Utils';
import Colors from '../../constants/Colors';
import Images from '../../constants/Images';
import Fonts from '../../constants/Fonts';
import AuthButton from '../Button/AuthButton';
import {navigate} from '../../Services/NavigationService';
type Props = {
  Visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const UsersRequestModal: FC<Props> = ({setVisible, Visible}) => {
  return (
    <Modal
      statusBarTranslucent
      transparent
      style={styles.modalContainer}
      visible={Visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Pressable>
            <Image source={Images.close} style={styles.closeIcon} />
          </Pressable>
          <Image
            source={Images.intro}
            resizeMode="contain"
            style={styles.introImage}
          />
          <Text style={styles.titleText}>Booking Request</Text>
          <Text style={styles.descriptionText}>
            Please fill your booking requirements. And we will arrange a taxi
            for you.
          </Text>

          <View style={styles.buttonContainer}>
            <View style={styles.buttonWrapper}>
              <AuthButton
                title="Cancel"
                textStyle={styles.cancelButtonText}
                onPress={() => {
                  setVisible(false);
                }}
                Mystyle={styles.cancelButton}
              />
            </View>
            <View
              style={[styles.buttonWrapper, styles.fillDetailsButtonWrapper]}>
              <AuthButton
                title="Fill the Details"
                onPress={() => {
                  navigate('BookingRequirement');
                  setVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UsersRequestModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000099',
  },
  modalContent: {
    backgroundColor: Colors.white,
    width: '90%',
    borderRadius: 10,
    paddingBottom: 25,
    paddingHorizontal: 20,
  },
  closeIcon: {
    position: 'absolute',
    right: -10,
    width: 24,
    top: 10,
    height: 24,
  },
  introImage: {
    width: moderateScale(137),
    height: moderateScale(75),
    alignSelf: 'center',
    marginTop: 30,
  },
  titleText: {
    fontFamily: Fonts.semiBold,
    color: Colors.black,
    alignSelf: 'center',
    marginTop: 20,
    fontSize: moderateScale(21),
  },
  descriptionText: {
    fontFamily: Fonts.regular,
    color: Colors.gray,
    marginTop: 10,
    fontSize: moderateScale(14),
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    flex: 1,
  },
  fillDetailsButtonWrapper: {
    marginStart: 15,
  },
  cancelButtonText: {
    color: Colors.blue,
  },
  cancelButton: {
    backgroundColor: '#EAF1FF',
  },
});
