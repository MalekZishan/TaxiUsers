import {
  View,
  Text,
  ScrollView,
  Pressable,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {
  DEVICE_TYPE,
  HEIGHT,
  Styles,
  WIDTH,
  moderateScale,
} from '../../constants/Utils';
import Animated, {
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

type Props = {
  headerTitles: string[];
  contentScreens: React.JSX.Element[];
};
interface HeaderLayoutType {
  x: number;
  width: number;
}

const AnimatedTopBar = ({headerTitles, contentScreens}: Props) => {
  const [headerLayout, setHeaderLayout] = useState<HeaderLayoutType[]>([]);
  const [height, setHeight] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const ScrollableAmount = useSharedValue(0);
  const ScrollableAmount2 = useSharedValue(0);

  const contentRef = useAnimatedRef<FlatList>();
  const headerRef = useAnimatedRef<Animated.ScrollView>();

  const onScroll = useAnimatedScrollHandler(value => {
    ScrollableAmount.value = value.contentOffset.x;
    let myInd = Math.round(value.contentOffset.x / WIDTH);
    runOnJS(setCurrentIndex)(myInd);
  });
  useEffect(() => {
    headerRef.current?.scrollTo({
      x: headerLayout[currentIndex == 0 ? currentIndex : currentIndex - 1]?.x,
      animated: true,
    });
  }, [currentIndex]);

  const onScroll2 = useAnimatedScrollHandler(value => {
    ScrollableAmount2.value = value.contentOffset.x;
  });

  const KnobStyle = useAnimatedStyle(() => {
    // Create the input range array based on the number of header titles
    const inputRange = headerTitles?.map((_, index) => WIDTH * index) || [];

    // Create the output range arrays based on the header layout
    const outputRange = headerLayout?.map(item => item?.x ?? 0) || [];
    const outputRangeOfWidth =
      headerLayout?.map(item => item?.width ?? 0) || [];

    // Ensure that the input and output ranges have at least 2 elements
    const validatedOutputRange =
      outputRange.length < 2 ? [0, WIDTH] : outputRange;
    const validatedOutputRangeOfWidth =
      outputRangeOfWidth.length < 2 ? [0, WIDTH] : outputRangeOfWidth;

    // Log the arrays to ensure they are populated correctly

    // Use the interpolate function with validated arrays
    const tx = interpolate(
      ScrollableAmount.value,
      inputRange,
      validatedOutputRange,
    );

    const translateX = (tx ?? 0) - (ScrollableAmount2.value ?? 0);

    const width = interpolate(
      ScrollableAmount.value,
      inputRange,
      validatedOutputRangeOfWidth,
    );

    // Ensure translateX and width are valid numbers
    const validTranslateX = isNaN(translateX) ? 1 : translateX;
    const validWidth = isNaN(width) ? WIDTH : width;

    // Return the style with the calculated transform and width
    return {
      transform: [{translateX: validTranslateX}],
      width: validWidth,
    };
  });

  const onTitlePress = (index: number) => {
    headerRef.current?.scrollTo({
      x: headerLayout[index == 0 ? index : index - 1].x,
      animated: true,
    });
    contentRef.current?.scrollToIndex({index, animated: true});
  };

  const setHeaderLocation = (index: number, layout: HeaderLayoutType) => {
    setHeaderLayout(preVal => {
      const temp = [...preVal];
      temp[index] = layout;
      return temp;
    });
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View>
        <Animated.ScrollView
          showsHorizontalScrollIndicator={false}
          ref={headerRef}
          scrollEventThrottle={16}
          onScroll={onScroll2}
          scrollEnabled={false}
          horizontal
          contentContainerStyle={[styles.headerStyle]}>
          <AnimatedHeader
            headerTitles={headerTitles}
            setHeaderLocation={setHeaderLocation}
            onTitlePress={onTitlePress}
            scrollAmount={ScrollableAmount}></AnimatedHeader>
        </Animated.ScrollView>
        <Animated.View
          style={[
            {
              width: headerLayout[0]?.width,
              height: 4,
              backgroundColor: Colors.yellow,
              transform: [{translateX: headerLayout[0]?.x}],
            },
            KnobStyle,
          ]}
        />
      </View>

      <Animated.FlatList
        // onLayout={(e) => {
        //    setHeight(e.nativeEvent.layout.height)
        // }}
        ref={contentRef}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        data={contentScreens}
        nestedScrollEnabled={true}
        horizontal
        pagingEnabled
        scrollEnabled={true}
        bounces={false}
        onScroll={onScroll}
        renderItem={({item: Item, index}) => {
          return (
            <View style={{width: WIDTH, flex: 1}} key={index}>
              {/* <Item /> */}
              {Item}
            </View>
          );
        }}
      />
    </View>
  );
};

export default AnimatedTopBar;

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: Colors.black,
    width: '100%',
    // height: 100,
  },
});

interface AnimatedHeaderProps {
  headerTitles: string[];
  setHeaderLocation: (index: number, layout: HeaderLayoutType) => void;
  onTitlePress: (index: number) => void;
  scrollAmount: SharedValue<number>;
}

const AnimatedHeader = (props: AnimatedHeaderProps) => {
  return (
    <>
      {props.headerTitles.map((title, index) => {
        return (
          <MyText
            key={index + 'ine' + index}
            index={index}
            title={title}
            {...props}
          />
        );
      })}
    </>
  );
};

interface MyTextProps extends AnimatedHeaderProps {
  index: number;
  title: string;
}
const MyText = ({
  headerTitles,
  setHeaderLocation,
  onTitlePress,
  scrollAmount,
  index,
  title,
}: MyTextProps) => {
  const color = useDerivedValue(() => {
    return Math.floor(scrollAmount.value) == Math.floor(WIDTH * index)
      ? Colors.yellow
      : '#ffff';
  });
  const textStyle = useAnimatedStyle(() => {
    return {
      color: color.value,
      fontFamily: Fonts.medium,
      marginHorizontal: 23,
    };
  });
  return (
    <Pressable
      style={{
        // height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 15,
        flex: 1,
      }}
      key={index}
      onLayout={event => {
        const {x, width} = event.nativeEvent.layout;
        setHeaderLocation(index, {x, width});
      }}
      onPress={() => onTitlePress(index)}>
      <Animated.Text
        allowFontScaling={false}
        style={[{fontSize: 15}, textStyle]}>
        {title}
      </Animated.Text>
    </Pressable>
  );
};
