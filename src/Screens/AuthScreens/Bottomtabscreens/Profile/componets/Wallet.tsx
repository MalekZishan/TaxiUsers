import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale, Styles} from '../../../../../constants/Utils';
import Colors from '../../../../../constants/Colors';
import NavHeader from '../../../../../components/Headers/NavHeader';
import Fonts from '../../../../../constants/Fonts';
import AuthButton from '../../../../../components/Button/AuthButton';
import MyKeyboardAvoidingScrollView from '../../../../../components/Scrollview/MyKeyboardAvoidingScrollView';
import Images from '../../../../../constants/Images';

const Wallet = () => {
  return (
    <View style={Styles.flex1}>
      <View style={styles.headerContainer}>
        <NavHeader title="Wallet" leftImgColor="#fff" titlelcr="#fff" />
        <View style={styles.balanceContainer}>
          <View style={styles.balanceRow}>
            <View style={styles.balanceInfo}>
              <Text style={styles.balanceAmount}>$5,837</Text>
              <Text style={styles.balanceLabel}>Total Balance</Text>
            </View>
            <View style={styles.balanceInfo}>
              <Text style={styles.balanceAmount}>$15,422</Text>
              <Text style={styles.balanceLabel}>Transferred</Text>
            </View>
          </View>
          <AuthButton
            title="Transfer to bank account "
            mt={20}
            Mystyle={styles.transferButton}
          />
        </View>
      </View>
      <MyKeyboardAvoidingScrollView style={styles.scrollContainer}>
        <View style={styles.incomeHeaderContainer}>
          <Text style={styles.incomeHeaderText}>Income History</Text>
          <View style={styles.incomeHeaderRight}>
            <Text style={styles.incomeHeaderTimeFrame}>Week</Text>
            <Image source={Images.arrow_rightdown} style={styles.arrowIcon} />
            <Image source={Images.search} style={styles.searchIcon} />
          </View>
        </View>

        <View style={styles.incomeHistoryContainer}>
          <Text style={styles.incomeDateText}>Todays</Text>
          <View style={styles.incomeRow}>
            <Text style={styles.incomeLabel}>10% Company Commission</Text>
            <Text style={styles.incomeAmount}>$75.00</Text>
          </View>
          <View style={styles.incomeRow}>
            <Text style={styles.incomeLabel}>3% admin Commission</Text>
            <Text style={styles.incomeAmountNegative}>-$35.00</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.incomeRowLast}>
            <Text style={styles.incomeLabel}>Total</Text>
            <Text style={styles.incomeAmountPositive}>$40.00</Text>
          </View>
        </View>
      </MyKeyboardAvoidingScrollView>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.blue,
    paddingBottom: 20,
  },
  balanceContainer: {
    paddingHorizontal: 50,
    marginTop: 10,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balanceInfo: {
    alignItems: 'center',
  },
  balanceAmount: {
    fontFamily: Fonts.bold,
    fontSize: moderateScale(27),
    color: '#fff',
  },
  balanceLabel: {
    fontFamily: Fonts.regular,
    fontSize: moderateScale(14),
    color: '#fff',
    marginTop: 5,
    opacity: 0.7,
  },
  transferButton: {
    backgroundColor: '#FFB902',
    height: 35,
  },
  scrollContainer: {
    paddingHorizontal: 15,
  },
  incomeHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  incomeHeaderText: {
    fontFamily: Fonts.medium,
    color: Colors.black,
    fontSize: moderateScale(18),
  },
  incomeHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  incomeHeaderTimeFrame: {
    fontFamily: Fonts.medium,
    fontSize: 14,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    tintColor: Colors.black,
    marginHorizontal: 5,
  },
  searchIcon: {
    width: 24,
    height: 24,
    tintColor: Colors.black,
    marginStart: 10,
  },
  incomeHistoryContainer: {
    borderRadius: 10,
    marginTop: 20,
    padding: 15,
    backgroundColor: '#F2F6FF',
  },
  incomeDateText: {
    fontFamily: Fonts.semiBold,
    color: Colors.black,
    marginStart: -3,
    fontSize: moderateScale(22),
  },
  incomeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginTop: 10,
  },
  incomeRowLast: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  incomeLabel: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.black,
  },
  incomeAmount: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    color: Colors.black,
  },
  incomeAmountNegative: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    color: Colors.black,
  },
  incomeAmountPositive: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    color: Colors.blue,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#D4E1FC',
    marginTop: 10,
  },
});
