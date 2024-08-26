import React, { useRef, useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
  Animated,
  PanResponder,
  Platform,
} from 'react-native';
import styles from './Style';

const SUPPORTED_ORIENTATIONS = [
  'portrait',
  'portrait-upside-down',
  'landscape',
  'landscape-left',
  'landscape-right',
];

interface RBSheetProps {
  animationType?: 'none' | 'slide' | 'fade';
  height?: number;
  minClosingHeight?: number;
  openDuration?: number;
  closeDuration?: number;
  closeOnDragDown?: boolean;
  closeOnPressMask?: boolean;
  dragFromTopOnly?: boolean;
  closeOnPressBack?: boolean;
  keyboardAvoidingViewEnabled?: boolean;
  customStyles?: Record<string, object>;
  onClose?: (props?: any) => void;
  onOpen?: (props?: any) => void;
  children?: React.ReactNode;
}

const RBSheet: React.FC<RBSheetProps> = ({
  animationType = 'none',
  height = 260,
  minClosingHeight = 0,
  openDuration = 300,
  closeDuration = 200,
  closeOnDragDown = false,
  closeOnPressMask = true,
  dragFromTopOnly = false,
  closeOnPressBack = true,
  keyboardAvoidingViewEnabled = Platform.OS === 'ios',
  customStyles = {},
  onClose,
  onOpen,
  children = <View />,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => closeOnDragDown,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0) {
          Animated.event([null, { dy: pan.y }], { useNativeDriver: false })(
            e,
            gestureState,
          );
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (height / 4 - gestureState.dy < 0) {
          setModalVisible(false);
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  const setModalVisibleFunc = (visible: boolean, props?: any) => {
    if (visible) {
      setModalVisible(visible);
      if (typeof onOpen === 'function') onOpen(props);
      Animated.timing(animatedHeight, {
        useNativeDriver: false,
        toValue: height,
        duration: openDuration,
      }).start();
    } else {
      Animated.timing(animatedHeight, {
        useNativeDriver: false,
        toValue: minClosingHeight,
        duration: closeDuration,
      }).start(() => {
        pan.setValue({ x: 0, y: 0 });
        setModalVisible(visible);
        if (typeof onClose === 'function') onClose(props);
      });
    }
  };

  const openFunc = (props?: any) => {
    setModalVisibleFunc(true, props);
  };

  const closeFunc = (props?: any) => {
    setModalVisibleFunc(false, props);
  };

  const panStyle = {
    transform: pan.getTranslateTransform(),
  };

  return (
    <Modal
      transparent
      animationType={animationType}
      visible={true}
      onRequestClose={() => {
        if (closeOnPressBack) setModalVisibleFunc(false);
      }}>
      <KeyboardAvoidingView
        enabled={keyboardAvoidingViewEnabled}
        behavior="padding"
        style={[styles.wrapper, customStyles.wrapper]}>
        <TouchableOpacity
          style={styles.mask}
          activeOpacity={1}
          onPress={() => (closeOnPressMask ? closeFunc() : null)}
        />
        <Animated.View
          {...(!dragFromTopOnly && panResponder.panHandlers)}
          style={[
            panStyle,
            styles.container,
            { height: animatedHeight },
            customStyles.container,
          ]}>
          {closeOnDragDown && (
            <View
              {...(dragFromTopOnly && panResponder.panHandlers)}
              style={styles.draggableContainer}>
              <View
                style={[styles.draggableIcon, customStyles.draggableIcon]}
              />
            </View>
          )}
          {children}
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default RBSheet;
