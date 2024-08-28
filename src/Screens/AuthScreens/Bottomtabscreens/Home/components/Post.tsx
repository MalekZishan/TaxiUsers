import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import Postcard from '../card/Postcard';

const Post = () => {
  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}>
      <Postcard />
    </View>
  );
};

export default memo(Post);

const styles = StyleSheet.create({});
