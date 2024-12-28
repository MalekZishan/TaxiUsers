import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../../../constants/Colors';
import Usersreqestmodal from '../../../../components/Modals/Usersreqestmodal';
import AuthButton from '../../../../components/Button/AuthButton';
import {navigate} from '../../../../Services/NavigationService';
import NavHeader from '../../../../components/Headers/NavHeader';
import {
  CIRCLE,
  moderateScale,
  SQUARE,
  Styles,
} from '../../../../constants/Utils';
import New from './components/New';
import MyKeyboardAvoidingScrollView from '../../../../components/Scrollview/MyKeyboardAvoidingScrollView';
import Post from './components/Post';
import {requestLocationPermission} from '../../../../Services/PermissionsServices';
import {fetchCurrentLocation} from '../../../../Hooks/useGetCurrentLocation';
import {useAppSelector} from '../../../../Hooks/ReduxHooks';
import {userDataSelector} from '../../../../Store/Data/Auth/AuthSlice';
import Images from '../../../../constants/Images';
import {t} from 'i18next';
import {UseNotificationCount} from '../../../../Hooks/API/UseNotification';

const Home = () => {
  UseNotificationCount();
  const data = useAppSelector(userDataSelector);
  const [Visible, setVisible] = useState(false);
  const [Status, setStatus] = useState<'New' | 'Past'>('New');
  let StatusData = [
    {
      id: '1',
      name: 'New',
    },
    {
      id: '2',
      name: 'Past',
    },
  ];
  // useEffect(() => {
  //   setTimeout(() => {
  //     setVisible(true);
  //   }, 3000);
  // }, []);

  const enableLocation = () => {
    requestLocationPermission()
      .then(async () => {
        fetchCurrentLocation()
          .then(res => {
            const lat = res.coords.latitude;
            const long = res.coords.longitude;
          })
          .catch(err => {
            console.log(err);
            // isRequesting.current = false
            // console.log(err);
          })
          .finally(() => {});
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    enableLocation();
  }, []);

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
        }}>
        <Usersreqestmodal {...{Visible, setVisible}} />
        <NavHeader
          title={t('My Bookings')}
          hideBackBtn
          rImg={Images.notification}
          onrPress={() => navigate('Notification')}
        />
        <View style={styles.statusContainer}>
          {StatusData.map((item, index) => (
            <View
              key={index}
              style={{
                marginLeft: index === 0 ? 0 : 15,
                flex: 1,
              }}>
              <AuthButton
                Mystyle={{
                  backgroundColor:
                    item.name === Status ? Colors.blue : '#EFEFEF',
                }}
                key={index}
                title={t(item.name as any)}
                onPress={() => {
                  setStatus(item?.name as any);
                  // navigate('BookingList', {status: item.name});
                }}
                textStyle={{
                  fontSize: moderateScale(12),
                  color: item.name === Status ? Colors.white : Colors.black,
                }}
              />
            </View>
          ))}
        </View>
        {/* <MyKeyboardAvoidingScrollView> */}
        {/* <New /> */}
        {Status === 'New' ? <New /> : <Post />}
        {/* </MyKeyboardAvoidingScrollView> */}
      </View>
      <Pressable
        style={[
          CIRCLE(50),
          {
            backgroundColor: Colors.blue,
            position: 'absolute',
            bottom: moderateScale(30),
            right: moderateScale(30),
          },
          Styles.centerDiv,
        ]}
        onPress={() => navigate('BookingRequirement')}>
        <Image source={Images.add} style={SQUARE(24)} tintColor={'white'} />
      </Pressable>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
});
