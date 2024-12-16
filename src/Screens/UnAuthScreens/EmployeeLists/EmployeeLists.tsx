import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import NavHeader from '../../../components/Headers/NavHeader';
import Colors from '../../../constants/Colors';
import Images from '../../../constants/Images';
import AuthButton from '../../../components/Button/AuthButton';
import {
  CIRCLE,
  HEIGHT,
  MH,
  moderateScale,
  MT,
  MV,
  Styles,
} from '../../../constants/Utils';
import {useFocusEffect} from '@react-navigation/native';
import {apiWithToken, imgSrc} from '../../../ApiService/core/ApiRequest';
import {ENDPOINTS} from '../../../constants/API.Constants';
import {navigate} from '../../../Services/NavigationService';
import {EmployeeList} from '../../../Models/Employee/employee';
import FlexDirRow from '../../../components/Layouts/FlexDirRow';
import {
  BCOLOR,
  bold,
  BR,
  medium,
  ML,
  semiBold,
} from '../../../components/CustomFont/MyFont';
import Flex1 from '../../../components/Layouts/Flex1';
import {t} from 'i18next';

type Props = {};

const EmployeeLists = (props: Props) => {
  const [employees, setEmployeesLists] = useState<EmployeeList[]>([]);
  useFocusEffect(
    React.useCallback(() => {
      fetcEmployees();
    }, []),
  );
  const fetcEmployees = () => {
    const showLoader = employees.length !== 0;
    apiWithToken(ENDPOINTS.GetEmployees, 'GET', '', showLoader).then(res => {
      setEmployeesLists(res?.data);
    });
  };
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
        }}>
        <NavHeader title={t('Employees')} />
        <FlatList
          data={employees}
          ListHeaderComponent={() => {
            return (
              <>
                <AuthButton
                  title={t('Add Employee')}
                  Mystyle={{
                    width: '50%',
                    height: moderateScale(35),
                    alignSelf: 'center',
                  }}
                  onPress={() => navigate('AddEmployee')}
                />
              </>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <>
                <Flex1>
                  <Text
                    style={[medium(20), {textAlign: 'center'}, MT(HEIGHT / 3)]}>
                    {t('No Employee Added')}
                  </Text>
                </Flex1>
              </>
            );
          }}
          renderItem={({item, index}) => {
            return (
              <>
                <FlexDirRow
                  style={[
                    Styles.commonShadow2,
                    MH(10),
                    MV(9),
                    BR(10),
                    {backgroundColor: 'white', padding: 10},
                    {justifyContent: 'space-between'},
                  ]}>
                  <FlexDirRow>
                    <Image
                      source={{uri: imgSrc(item?.profile_pic)}}
                      style={[CIRCLE(49), BCOLOR(Colors.imageLoad)]}
                    />
                    <View style={{flex: 1}}>
                      <Text style={[bold(15), ML(13)]}>{item?.full_name}</Text>
                      <Text style={[semiBold(10), ML(13)]}>{item?.email}</Text>
                      <FlexDirRow
                        style={{
                          alignItems: 'flex-end',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={[semiBold(10, Colors.gray), ML(13)]}>
                          {item?.phone_number}
                        </Text>
                        <Text style={[semiBold(10, Colors.gray), ML(13)]}>
                          {item?.date_created}
                        </Text>
                      </FlexDirRow>
                    </View>
                  </FlexDirRow>
                </FlexDirRow>
              </>
            );
          }}
        />
      </View>
    </>
  );
};

export default EmployeeLists;

const styles = StyleSheet.create({});
