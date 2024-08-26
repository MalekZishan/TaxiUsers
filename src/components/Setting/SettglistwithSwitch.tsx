import {
  Animated,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {SQUARE, Styles} from '../../constants/Utils';
import Colors from '../../constants/Colors';
import Flex1 from '../Layouts/Flex1';
import Fonts from '../../constants/Fonts';
import LinearGradient from 'react-native-linear-gradient';

export interface SettingsListProps {
  title: string;
  icon: ImageSourcePropType;
  screenName?: string;
  onpress?: () => void;
}

const SettglistwithSwitch: React.FC<SettingsListProps> = ({
  icon,
  title,
  screenName,
  onpress,
}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = (p0: boolean) =>
    setIsEnabled(previousState => !previousState);
  const [switchAnim] = useState(new Animated.Value(isEnabled ? 1 : 0));

  const knobColor = isEnabled ? '#ffff' : '#ffff';
  const translateX = switchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 10], // Adjust this range according to the size of your switch
  });

  const toggleAnimatedSwitch = () => {
    Animated.spring(switchAnim, {
      toValue: isEnabled ? 0 : 1,
      useNativeDriver: true,
    }).start();

    toggleSwitch(!isEnabled);
  };
  return (
    <Pressable
      style={[styles.container, {}]}
      onPress={() => {
        onpress ? onpress() : navigation.navigate(screenName as any);
      }}>
      <Image source={icon} style={{...SQUARE(25)}} />
      <Flex1
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#ECECEC',
          flex: 1,
          marginLeft: 25,
          paddingBottom: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontFamily: Fonts.medium,
            color: Colors.black,
            fontSize: 15,
          }}>
          {title}
        </Text>
        <TouchableOpacity onPress={toggleAnimatedSwitch}>
          <LinearGradient
            locations={[0, 1]}
            useAngle={true}
            angle={98.49} // These are example colors; replace with your gradient
            style={styles.gradientSwitch}
            colors={isEnabled ? ['#F9F90E', '#FF3960'] : ['#D4D4D4', '#D4D4D4']} // Adjust these colors based on the color picker results
          >
            <Animated.View
              style={[
                styles.knob,
                {
                  transform: [{translateX}],
                  backgroundColor: knobColor,
                },
              ]}
            />
          </LinearGradient>
        </TouchableOpacity>
      </Flex1>
    </Pressable>
  );
};

export default SettglistwithSwitch;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginVertical: 7.5,
    marginLeft: 20,
  },
  text: {
    ...Styles.normalFontStyle,
    color: 'black',
  },
  gradientSwitch: {
    width: 49,
    height: 29,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginEnd: 10,
  },
  knob: {
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
});
