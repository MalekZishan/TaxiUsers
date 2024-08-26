import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-controller';

interface Props extends KeyboardAwareScrollViewProps {
  ref?: React.RefObject<KeyboardAwareScrollViewProps>;
}

const MyKeyboardAvoidingScrollView = ({children, ref, ...props}: Props) => {
  return (
    <KeyboardAwareScrollView
      {...props}
      bounces={false}
      bottomOffset={30}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
      }}>
      {children}
    </KeyboardAwareScrollView>
  );
};

export default MyKeyboardAvoidingScrollView;

const styles = StyleSheet.create({});
