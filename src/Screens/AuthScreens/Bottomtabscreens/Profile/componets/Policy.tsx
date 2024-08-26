import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import RenderHtml from 'react-native-render-html';
import {getApi} from '../../../../../ApiService/core/ApiRequest';
import {Styles, width} from '../../../../../constants/Utils';
import MyKeyboardAvoidingScrollView from '../../../../../components/Scrollview/MyKeyboardAvoidingScrollView';
import NavHeader from '../../../../../components/Headers/NavHeader';

const TremCon = () => {
  const [Text, setText] = useState('');
  console.log('🚀 ~ TremCon ~ Text:', Text);
  const source = {
    html: Text,
  };
  const GetTremCon = () => {
    getApi('user/Privacy-Policy')
      .then((res: any) => {
        console.log(res);
        setText(res.data[0].text);
      })
      .catch(er => {
        console.log(er);
      });
  };
  useEffect(() => {
    GetTremCon();
  }, []);

  return (
    <View style={Styles.flex1}>
      <NavHeader title="Trems And Conditions" />
      <MyKeyboardAvoidingScrollView
        style={{
          paddingHorizontal: 10,
        }}>
        <RenderHtml
          contentWidth={width}
          source={source}
          baseStyle={{
            fontSize: 16,
            color: 'black',
            fontStyle: 'italic',
            alignSelf: 'center',
            paddingHorizontal: 30,
          }}
        />
      </MyKeyboardAvoidingScrollView>
    </View>
  );
};

export default TremCon;

const styles = StyleSheet.create({});
