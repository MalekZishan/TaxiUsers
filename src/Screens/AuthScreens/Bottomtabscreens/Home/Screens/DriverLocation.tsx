import {Image, Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import NavHeader from '../../../../../components/Headers/NavHeader';
import Mapviewshow, {ETA} from '../components/Mapviewshow';
import Images from '../../../../../constants/Images';
import {moderateScale} from '../../../../../constants/Utils';
import Fonts from '../../../../../constants/Fonts';
import Colors from '../../../../../constants/Colors';
import {NavigationProps} from '../../../../../Models/Navigation/NavigationModels';
import {imgSrc} from '../../../../../ApiService/core/ApiRequest';
import {navigate} from '../../../../../Services/NavigationService';
import NewMessageCard from '../../../../../components/Card/NewMessageCard';
import {t} from 'i18next';

const DriverLocation = ({
  navigation,
  route,
}: NavigationProps<'DriverLocation'>) => {
  const bookingData = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <NavHeader />
        <View style={styles.infoContainer}>
          <View style={styles.infoCard}>
            <View style={styles.driverNameContainer}>
              <Image
                source={{uri: imgSrc(bookingData?.driver_detail?.profile_pic)}}
                style={styles.driverImage}
              />
              <View style={styles.driverInfoContainer}>
                <Text style={styles.driverNameText}>
                  {bookingData?.full_name}
                </Text>
                <View style={styles.contactIconsContainer}>
                  <Pressable onPress={() => navigate('Chat', bookingData)}>
                    <Image
                      source={Images.msg}
                      resizeMode="contain"
                      style={styles.contactIcon}
                    />
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      Linking.openURL(`tel:${bookingData?.phone_number}`);
                    }}>
                    <Image
                      resizeMode="contain"
                      source={Images.call}
                      style={[styles.contactIcon, styles.callIcon]}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.locationRow}>
              <View style={styles.iconContainer}>
                <Image
                  resizeMode="contain"
                  source={Images.radio}
                  style={styles.radioIcon}
                />
                <Image source={Images.Line} style={styles.lineImage} />
                <Image
                  source={Images.Location}
                  resizeMode="contain"
                  style={styles.locationIcon}
                />
              </View>
              <View style={styles.addressContainer}>
                <View style={styles.addressBlock}>
                  <Text style={styles.labelText}>{t('From')}</Text>
                  <Text style={styles.addressText}>
                    {bookingData?.pick_up_adds}
                  </Text>
                </View>
                <View style={styles.addressBlockTo}>
                  <Text style={styles.labelText}>{t('To')}</Text>
                  <Text style={styles.addressText} lineBreakMode="clip">
                    {bookingData?.drop_of_adds}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              {/* <AuthButton
                title="Pay Now"
                onPress={() => {
                  navigate('Paynow');
                }}
                mt={20}
                Mystyle={styles.payButton}
              /> */}
            </View>
          </View>
        </View>
        <NewMessageCard bookingData={bookingData} />
        <ETA {...bookingData} />
      </View>
      <Mapviewshow {...bookingData} />
    </View>
  );
};

export default DriverLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    zIndex: 999,
    width: '100%',
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  driverNameContainer: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  driverImage: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(40),
  },
  driverInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginStart: 15,
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
  separator: {
    borderBottomWidth: 1,
    marginTop: 13,
    borderBottomColor: '#E5E5E5',
  },
  locationRow: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    alignItems: 'center',
  },
  radioIcon: {
    width: moderateScale(17),
    height: moderateScale(17),
  },
  lineImage: {
    width: moderateScale(1),
    height: moderateScale(36),
    flex: 1,
  },
  locationIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    top: -3,
  },
  addressContainer: {},
  addressBlock: {
    marginStart: 10,
    top: -7,
  },
  addressBlockTo: {
    marginTop: moderateScale(10),
    marginStart: 10,
    top: 5,
  },
  labelText: {
    fontFamily: Fonts.regular,
    color: Colors.gray,
    fontSize: moderateScale(12),
  },
  addressText: {
    fontFamily: Fonts.regular,
    color: Colors.black,
    fontSize: moderateScale(14),
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
  payButton: {
    height: 40,
  },
});
