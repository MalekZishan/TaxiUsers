import {Image, Pressable, StyleSheet, Switch, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import NavHeader from '../../../../../components/Headers/NavHeader';
import {Styles} from '../../../../../constants/Utils';
import {navigate} from '../../../../../Services/NavigationService';
import Images from '../../../../../constants/Images';
import {medium} from '../../../../../components/CustomFont/MyFont';
import Colors from '../../../../../constants/Colors';

const Setting = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [isEnabled1, setIsEnabled1] = useState(false);
  const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);

  return (
    <View style={Styles.flex1}>
      <NavHeader title="Settings" />

      <View style={styles.Continer}>
        <Text style={medium(15)}>Email Notification</Text>
        <Switch
          trackColor={{false: '#C6D5C8', true: Colors.blue}}
          thumbColor={isEnabled ? '#FFFFFF' : '#ffff'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={styles.Continer}>
        <Text style={medium(15)}>SMS Notification</Text>
        <Switch
          trackColor={{false: '#C6D5C8', true: Colors.blue}}
          thumbColor={isEnabled1 ? '#FFFFFF' : '#ffff'}
          onValueChange={toggleSwitch1}
          value={isEnabled1}
        />
      </View>

      <Pressable
        onPress={() => {
          navigate('ChangePassword');
        }}
        style={[
          styles.Continer,
          {
            marginTop: 15,
          },
        ]}>
        <Text style={medium(15)}>Change Password </Text>
        <Image
          source={Images.arrow_right1}
          style={{
            width: 24,
            height: 24,
          }}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          navigate('ChangePassword');
        }}
        style={[
          styles.Continer,
          {
            marginTop: 15,
          },
        ]}>
        <Text style={medium(15)}>Language</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={medium(15, Colors.blue)}>English</Text>
          <Image
            source={Images.arrow_right1}
            style={{
              width: 24,
              marginStart: 4,
              height: 24,
            }}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  Continer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginTop: 10,
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomColor: '#EFEFEF',
    justifyContent: 'space-between',
  },
});
