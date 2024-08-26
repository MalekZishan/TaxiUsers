import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
} from 'react-native';
import {WIDTH, semiBold} from '../CustomFont/MyFont';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import NewScreen from '../../Screens/AuthScreens/Barberscreens/home/component/NewScreen';
import IngoingScreen from '../../Screens/AuthScreens/Barberscreens/home/component/IngoingScreen';
import CompletedScreen from '../../Screens/AuthScreens/Barberscreens/home/component/CompletedScreen';

const {width} = Dimensions.get('window');

const headers = ['New', 'Ongoing', 'Completed', 'Message'];
const screens: any = [
  <NewScreen />,
  <IngoingScreen />,
  <CompletedScreen />,
  <CompletedScreen />,
];

let animationActive = true;
let animationActiveRef: NodeJS.Timeout;

interface HeaderWidths {
  [index: number]: number;
}

export default function AnimatedTopHeader() {
  const [headerWidths, setWidths] = useState<HeaderWidths>({});
  const [active, setActive] = useState<number>(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const barTranslate = Animated.multiply(scrollX, -1);
  const barTranslate1 = useRef(new Animated.Value(0)).current;
  const headerScrollView = useRef<FlatList<string>>(null);
  const itemScrollView = useRef<FlatList<string>>(null);

  useEffect(() => {
    let leftOffset = 0;
    for (let i = 0; i < active; i += 1) {
      leftOffset += headerWidths[i] || 0;
    }
    headerScrollView.current?.scrollToIndex({index: active, viewPosition: 0.5});
    Animated.spring(barTranslate1, {
      toValue: leftOffset,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  }, [active, headerWidths]);

  const onPressHeader = (index: number) => {
    if (animationActiveRef) {
      clearTimeout(animationActiveRef);
    }
    if (active !== index) {
      animationActive = false;
      animationActiveRef = setTimeout(() => {
        animationActive = true;
      }, 400);
      itemScrollView.current?.scrollToIndex({index});
      LayoutAnimation.easeInEaseOut();
      setActive(index);
    }
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    let newIndex = Math.floor(x / width + 0.5);
    if (active !== newIndex && animationActive) {
      LayoutAnimation.easeInEaseOut();
      setActive(newIndex);
    }
  };

  const onHeaderLayout = (width: number, index: number) => {
    setWidths(prevWidths => ({
      ...prevWidths,
      [index]: width,
    }));
  };

  return (
    <View style={styles.container}>
      <View
        style={
          {
            // flex: 1,
            // width: WIDTH,
          }
        }>
        <FlatList
          data={headers}
          ref={headerScrollView}
          keyExtractor={(item, index) => index + '_' + index}
          horizontal
          style={styles.headerScroll}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={() => <View style={styles.headerBar} />}
          renderItem={({item, index}) => (
            <View
              style={{overflow: 'hidden', flex: 1}}
              key={index + '_' + index}>
              <TouchableOpacity
                onLayout={e =>
                  onHeaderLayout(e.nativeEvent.layout.width, index)
                }
                onPress={() => onPressHeader(index)}
                key={item}
                style={[
                  styles.headerItem,
                  // {backgroundColor: active === index ? '#2863a6' : '#1e4d82'},
                ]}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: active === index ? Colors.yellow : '#ffff',
                      fontFamily: Fonts.medium,
                      fontSize: 14,
                    }}>
                    {item}
                  </Text>
                  {index == 0 && (
                    <View
                      style={[
                        styles.notiview,
                        {
                          top: Platform.OS == 'android' ? 2 : 0,
                        },
                      ]}>
                      <Text
                        style={[
                          semiBold(12),
                          {
                            top: Platform.OS == 'android' ? -2 : 0,
                          },
                        ]}>
                        2
                      </Text>
                    </View>
                  )}
                  {index == 3 && (
                    <View
                      style={[
                        styles.notiview,
                        {
                          top: Platform.OS == 'android' ? 2 : 0,
                        },
                      ]}>
                      <Text
                        style={[
                          semiBold(12),
                          {
                            top: Platform.OS == 'android' ? -2 : 0,
                          },
                        ]}>
                        2
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
        <Animated.View
          style={[
            styles.headerBar,
            {
              width: headerWidths[active],
              transform: [
                {translateX: barTranslate},
                {translateX: barTranslate1},
              ],
            },
          ]}
        />
      </View>
      <FlatList
        data={screens}
        ref={itemScrollView}
        keyExtractor={(item, index) => index + '_' + index}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
        renderItem={({item: Item, index}) => {
          return (
            <View style={{width: WIDTH, flex: 1}} key={index + '_' + index}>
              {/* <Item /> */}
              {Item}
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerScroll: {
    backgroundColor: Colors.black,
    // flex: 1,
  },
  headerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15,
    width: width / 3,
  },
  mainItem: {
    width: width,
    borderWidth: 5,
    borderColor: '#fff',
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  notiview: {
    height: 19,
    width: 19,
    backgroundColor: Colors.yellow,
    borderRadius: 19,
    marginStart: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBar: {
    height: 3,
    position: 'absolute',
    backgroundColor: Colors.yellow,
    bottom: 1,
  },
});
