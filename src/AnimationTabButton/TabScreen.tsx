import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import TabButtons, {TabButtonsType} from './TabButtons';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AuthButton from '../components/Button/AuthButton';
enum CustomTab {
  Tab1,
  Tab2,
  Tab3,
}
const TabScreen = () => {
  const [selectedTab, setselectedTab] = useState<CustomTab>(CustomTab.Tab1);
  const buttons: TabButtonsType[] = [
    {
      title: 'Tab 1',
    },
    {
      title: 'Tab 2',
    },
  ];
  const [Demolist, setDemolist] = useState('');
  const [Prid3, setPrid3] = useState('');

  const List = () => {
    console.log('Sd');
    setDemolist('Sd');
  };
  const ListmemoUSecallbac = useCallback(() => {
    console.log('ds');
    setDemolist('Sd');
  }, []);
  const demeshowlist = (d: string) => {
    console.log('usemmeo');
    setPrid3('Sd');
    return d;
  };

  const usememo = useMemo(() => demeshowlist('sddsdsds'), [Prid3]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView
        style={{
          flex: 1,
          marginHorizontal: 20,
        }}>
        <TabButtons buttons={buttons} {...{selectedTab, setselectedTab}} />
        <AuthButton title="sd" onPress={ListmemoUSecallbac} />
        <Text>{usememo}</Text>
        {selectedTab == CustomTab.Tab1 ? (
          <View>
            <Text>Tab 1</Text>
          </View>
        ) : selectedTab == CustomTab.Tab2 ? (
          <View>
            <Text>Tab 2</Text>
          </View>
        ) : (
          <View>
            <Text>Tab 3</Text>
          </View>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default TabScreen;

const styles = StyleSheet.create({});
