import {Image, Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Fonts from '../../../../../constants/Fonts';
import Images from '../../../../../constants/Images';
import {moderateScale} from '../../../../../constants/Utils';
import Colors from '../../../../../constants/Colors';
import {navigate} from '../../../../../Services/NavigationService';
import {Driver_detail} from '../../../../../Models/Booking/booking.modal';
import {imgSrc} from '../../../../../ApiService/core/ApiRequest';
import {t} from 'i18next';

interface DrivercardProps extends Driver_detail {
  onGetDirection: () => void;
  onMessage: () => void;
}
const Drivercard = (props: DrivercardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{t('Driver Details')}</Text>

      <View style={styles.driverInfoContainer}>
        <Image
          source={{uri: imgSrc(props?.profile_pic)}}
          style={styles.driverImage}
        />
        <View style={styles.driverDetailsContainer}>
          <View style={styles.driverNameContainer}>
            <Text style={styles.driverNameText}>{props?.full_name}</Text>
            <View style={styles.contactIconsContainer}>
              <Pressable onPress={props.onMessage}>
                <Image
                  source={Images.msg}
                  resizeMode="contain"
                  style={styles.contactIcon}
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  Linking.openURL(`tel:${props?.phone_number}`);
                }}>
                <Image
                  resizeMode="contain"
                  source={Images.call}
                  style={[styles.contactIcon, styles.callIcon]}
                />
              </Pressable>
            </View>
          </View>

          <Pressable
            onPress={() => props?.onGetDirection()}
            style={styles.directionContainer}>
            <Image source={Images.direction} style={styles.directionIcon} />
            <Text style={styles.directionText}>{t('Get Direction')}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Drivercard;

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(20),
    paddingHorizontal: 20,
  },
  headerText: {
    fontFamily: Fonts.regular,
    fontSize: moderateScale(13),
    color: Colors.black,
  },
  driverInfoContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  driverImage: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(40),
    backgroundColor: Colors.imageLoad,
  },
  driverDetailsContainer: {
    marginStart: 13,
    flex: 1,
  },
  driverNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  driverNameText: {
    fontFamily: Fonts.semiBold,
    color: Colors.black,
    fontSize: moderateScale(16),
  },
  contactIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactIcon: {
    width: 34,
    height: 34,
  },
  callIcon: {
    marginStart: 13,
  },
  directionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  directionIcon: {
    width: 24,
    marginEnd: 13,
    height: 24,
  },
  directionText: {
    fontFamily: Fonts.semiBold,
    fontSize: moderateScale(15),
    color: Colors.blue,
  },
});
