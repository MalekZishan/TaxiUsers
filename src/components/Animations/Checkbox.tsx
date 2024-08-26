import {StyleSheet} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type CheckboxProps = {
  label: string;
  checked: boolean;
  onPress: () => void;
};

const TimingConfig = {
  duration: 150,
};

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onPress,
}) => {
  const rContainerStyle = useAnimatedStyle(() => {
    return {
      borderColor: withTiming(checked ? 'red' : 'green', TimingConfig),
      paddingLeft: 20,
      paddingRight: !checked ? 20 : 14,
    };
  }, [checked]);

  const rTextStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(checked ? 'red' : 'green', TimingConfig),
    };
  }, [checked]);

  return (
    <Animated.View
      layout={LinearTransition.springify().mass(0.9)}
      style={[styles.container, rContainerStyle]}
      onTouchEnd={onPress}>
      <Animated.Text style={[styles.label, rTextStyle]}>{label}</Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontFamily: 'SF-Pro-Rounded-Bold',
    color: '#fff',
  },
});
