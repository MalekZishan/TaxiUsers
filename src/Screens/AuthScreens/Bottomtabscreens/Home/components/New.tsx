import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import NewCard from '../card/NewCard';

const New = () => {
  let data = [
    {
      id: 1,
      isDrirver: false,
    },
    {
      id: 2,
      isDrirver: true,
    },
  ];
  return (
    <View>
      {data.map(item => (
        <NewCard key={item.id} data={item} />
      ))}
    </View>
  );
};

export default memo(New);

const styles = StyleSheet.create({});
