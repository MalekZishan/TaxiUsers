import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../../../../constants/Colors';
import NavHeader from '../../../../../components/Headers/NavHeader';
import AuthButton from '../../../../../components/Button/AuthButton';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../constants/Utils';
import MyKeyboardAvoidingScrollView from '../../../../../components/Scrollview/MyKeyboardAvoidingScrollView';
import Images from '../../../../../constants/Images';
import LabelInputField from '../../../../../components/InputText/LableInputField';
import DropDown from '../../../../../components/DropDown';
import {data} from './BookingRequirement';
import Fonts from '../../../../../constants/Fonts';
import {t} from 'i18next';

const Paynow = () => {
  const [Status, setStatus] = useState<'Credit Card' | 'Cash'>('Credit Card');
  let StatusData = [
    {
      id: '1',
      name: 'Credit Card',
    },
    {
      id: '2',
      name: 'Cash',
    },
  ];
  return (
    <View style={styles.container}>
      <NavHeader title={t('Pay Now')} />
      <View style={styles.statusContainer}>
        {StatusData.map((item, index) => (
          <View
            key={index}
            style={
              index === 0 ? styles.firstStatusButton : styles.otherStatusButton
            }>
            <AuthButton
              Mystyle={{
                backgroundColor: item.name === Status ? Colors.blue : '#EFEFEF',
                borderRadius: 8,
                height: 59,
              }}
              key={index}
              title={item.name}
              onPress={() => {
                setStatus(item?.name as any);
              }}
              textStyle={{
                color: item.name === Status ? Colors.white : Colors.black,
              }}
            />
          </View>
        ))}
      </View>

      <MyKeyboardAvoidingScrollView style={styles.scrollView}>
        <View>
          <Image
            source={Images.Card}
            resizeMode="contain"
            style={styles.cardImage}
          />
          <LabelInputField
            label={t('Name on Card')}
            placeholder={t('Name on Card')}
            lImg={Images.userblue}
            lImageStyle={styles.inputImageStyle}
          />
          <LabelInputField
            label={t('Card Number')}
            placeholder={t('Card Number')}
            lImg={Images.card1}
            keyboardType="name-phone-pad"
            lImageStyle={styles.inputImageStyle}
          />

          <View style={styles.expiryContainer}>
            <View style={styles.expiryRow}>
              <View style={styles.expiryBlock}>
                <Text style={styles.labelText}>{t('Expiry Date')}</Text>
                <DropDown items={data} placeholder={t('MM')} />
              </View>
              <View style={styles.yearBlock}>
                <Text style={styles.emptyLabelText}></Text>
                <DropDown items={data} placeholder={t('YYYY')} />
              </View>
              <View style={styles.cvvBlock}>
                <LabelInputField placeholder={t('CVV')} label={t('CVV')} />
              </View>
            </View>
          </View>
          <AuthButton mt={20} title={t('Pay Now')} />
        </View>

        <View style={styles.billDetailContainer}>
          <Text style={styles.billDetailTitle}>{t('Bill Detail')}</Text>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Fare Price</Text>
            <Text style={styles.billValue}>$ 178</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Service Tax</Text>
            <Text style={styles.billValue}>$ 5</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Service Tax</Text>
            <Text style={styles.billValue}>$ 5</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>$ 5</Text>
          </View>
        </View>
      </MyKeyboardAvoidingScrollView>
    </View>
  );
};

export default Paynow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  firstStatusButton: {
    marginLeft: 0,
    flex: 1,
  },
  otherStatusButton: {
    marginLeft: 15,
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  cardImage: {
    width: '100%',
    height: moderateScale(176),
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  inputImageStyle: {
    tintColor: Colors.black,
  },
  expiryContainer: {
    alignItems: 'center',
    marginTop: -5,
  },
  expiryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expiryBlock: {
    flex: 1,
  },
  yearBlock: {
    marginStart: 10,
    flex: 1,
  },
  cvvBlock: {
    marginStart: 30,
    flex: 1,
  },
  labelText: {
    fontFamily: Fonts.regular,
    fontSize: moderateScale(14),
    color: Colors.black,
    marginVertical: moderateScaleVertical(9),
  },
  emptyLabelText: {
    marginVertical: moderateScaleVertical(9),
  },
  billDetailContainer: {
    marginTop: 30,
    marginBottom: 30,
  },
  billDetailTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: moderateScale(16),
    color: Colors.black,
    marginBottom: 20,
  },
  billRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
    justifyContent: 'space-between',
    paddingBottom: 10,
    marginVertical: 6,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
    justifyContent: 'space-between',
    paddingBottom: 10,
    marginTop: 6,
  },
  billLabel: {
    fontFamily: Fonts.regular,
    color: Colors.black,
    fontSize: moderateScale(14),
  },
  billValue: {
    fontFamily: Fonts.regular,
    color: Colors.black,
    fontSize: moderateScale(14),
  },
  totalLabel: {
    fontFamily: Fonts.bold,
    color: Colors.black,
    fontSize: moderateScale(14),
  },
  totalValue: {
    fontFamily: Fonts.bold,
    color: Colors.black,
    fontSize: moderateScale(14),
  },
});
