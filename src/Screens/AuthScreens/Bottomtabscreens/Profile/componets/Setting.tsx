import {
  I18nManager,
  Image,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import NavHeader from '../../../../../components/Headers/NavHeader';
import {moderateScale, Styles, WIDTH} from '../../../../../constants/Utils';
import {navigate} from '../../../../../Services/NavigationService';
import Images from '../../../../../constants/Images';
import {medium, semiBold} from '../../../../../components/CustomFont/MyFont';
import Colors from '../../../../../constants/Colors';
import {Dropdown} from 'react-native-element-dropdown';
import Fonts from '../../../../../constants/Fonts';
import {useAppSelector} from '../../../../../Hooks/ReduxHooks';
import {
  setGlobalLanguage,
  userDataSelector,
} from '../../../../../Store/Data/Auth/AuthSlice';
import i18next, {t} from 'i18next';
import {store} from '../../../../../Store/Store';
import RNRestart from 'react-native-restart';
import LoadingIndicator from '../../../../../comman/LoadingIndicator';
const Setting = () => {
  const {lng} = useAppSelector(userDataSelector);
  // const lng = 'en';
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [isEnabled1, setIsEnabled1] = useState(false);
  const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);

  const [language, setLanguage] = useState<string>(
    LanguageData.filter((item: any) => item.code == lng)[0].lang,
  );

  return (
    <View style={Styles.flex1}>
      <NavHeader title={t('Settings')} />

      <View style={styles.Continer}>
        <Text style={medium(15)}>{t('Email Notification')}</Text>
        <Switch
          trackColor={{false: '#C6D5C8', true: Colors.blue}}
          thumbColor={isEnabled ? '#FFFFFF' : '#ffff'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={styles.Continer}>
        <Text style={medium(15)}>{t('SMS Notification')}</Text>
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
        <Text style={medium(15)}>{t('Change Password')}</Text>
        <Image
          source={Images.arrow_right1}
          style={{
            width: 24,
            height: 24,
          }}
        />
      </Pressable>
      <View
        style={[
          styles.Continer,
          {
            marginTop: 15,
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
            borderBottomColor: '#4A4A4A',
          }}>
          <Text style={medium(15)}>{t('Language')}</Text>
          <Dropdown
            data={LanguageData}
            fontFamily={Fonts.regular}
            labelField="lang"
            valueField="lang"
            placeholder=""
            value={language}
            style={{width: WIDTH * 0.3}}
            selectedTextStyle={semiBold(15, Colors.blue)}
            placeholderStyle={semiBold(15)}
            dropdownPosition="bottom"
            iconColor={Colors.black}
            onChange={(txt: any) => {
              setLanguage(txt.lang);
              i18next.changeLanguage(txt.code).then(() => {
                store.dispatch(setGlobalLanguage(txt.code));
                I18nManager.forceRTL(i18next.language === 'ar');
                LoadingIndicator.show();
                setTimeout(() => {
                  RNRestart.Restart();
                }, 1000);
              });
            }}
            itemContainerStyle={{
              width: WIDTH * 0.3,
            }}
            itemTextStyle={{color: Colors.black}}
          />
        </View>
      </View>
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

export const LanguageData: any = [
  {
    id: 1,
    lang: 'English',
    l: 'Language',
    code: 'en',
  },
  {
    id: 2,
    lang: 'Arabic',
    l: 'Language',
    code: 'ar',
  },
];
