import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../../../constants/Colors';
import NavHeader from '../../../../components/Headers/NavHeader';
import Images from '../../../../constants/Images';
import {moderateScale, Styles} from '../../../../constants/Utils';
import Fonts from '../../../../constants/Fonts';
import Flex1 from '../../../../components/Layouts/Flex1';
import SettingList from '../../../../components/Setting/Settinglist';
import LogoutModal from '../../../../components/Modals/LogoutModal';

const Profile = () => {
  const [visible, setVisible] = useState(false);
  let Data = [
    {
      icon: Images.edit_Profile,
      screenName: 'EditProfile',
      title: 'Edit Profile',
    },
    {
      icon: Images.wallet,
      screenName: 'Wallet',
      title: 'Wallet',
    },
    {
      icon: Images.settings,
      screenName: 'Setting',
      title: 'Setting',
    },

    {
      icon: Images.terms_and_condition,
      screenName: 'TremCon',
      title: 'Privacy Policy',
    },
    {
      icon: Images.logout,
      screenName: '',
      title: 'Logout',
      onpress: () => {
        setVisible(true);
      },
    },
  ];
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      <LogoutModal {...{visible, setVisible}} />
      <NavHeader hideBackBtn title="My Profile" />
      <View style={styles.profileContainer}>
        <View style={styles.profileInfo}>
          <Image source={Images.ProfilePi} style={styles.profileImage} />
          <Text style={styles.profileName}>{`Guy \nHawkins`}</Text>
        </View>
      </View>
      <Flex1 style={{...Styles.container, backgroundColor: 'white'}}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          {Data.map(item => (
            <SettingList {...item} key={item.title} />
          ))}
        </ScrollView>
      </Flex1>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  profileContainer: {
    paddingHorizontal: 10,
  },
  profileInfo: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#F2F3F8',
  },
  profileImage: {
    width: moderateScale(116),
    height: moderateScale(116),
    borderRadius: moderateScale(116),
  },
  profileName: {
    fontFamily: Fonts.bold,
    fontSize: moderateScale(25),
    marginStart: 15,
    color: Colors.black,
  },
  flexContainer: {
    backgroundColor: 'white',
  },
});
