import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import TabButtons, {TabButtonsType} from './TabButtons';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
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

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView
        style={{
          flex: 1,
          marginHorizontal: 20,
        }}>
        <TabButtons buttons={buttons} {...{selectedTab, setselectedTab}} />
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
