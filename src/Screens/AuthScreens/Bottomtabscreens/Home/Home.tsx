import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../../../constants/Colors';
import Usersreqestmodal from '../../../../components/Modals/Usersreqestmodal';
import AuthButton from '../../../../components/Button/AuthButton';
import {navigate} from '../../../../Services/NavigationService';
import NavHeader from '../../../../components/Headers/NavHeader';
import {moderateScale} from '../../../../constants/Utils';
import New from './components/New';
import MyKeyboardAvoidingScrollView from '../../../../components/Scrollview/MyKeyboardAvoidingScrollView';
import Post from './components/Post';

const Home = () => {
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
  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 3000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      {/* <Usersreqestmodal {...{Visible, setVisible}} /> */}
      <NavHeader title="My Bookings" />
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
                backgroundColor: item.name === Status ? Colors.blue : '#EFEFEF',
              }}
              key={index}
              title={item.name}
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
      <MyKeyboardAvoidingScrollView>
        {/* <New /> */}
        {Status === 'New' ? <New /> : <Post />}
      </MyKeyboardAvoidingScrollView>
    </View>
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