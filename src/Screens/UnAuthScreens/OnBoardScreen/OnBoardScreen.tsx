import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import Images from '../../../constants/Images';
import {height, moderateScale, width} from '../../../constants/Utils';
import {
  useBottomBarHeight,
  useGetStatusBarHeight,
} from '../../../Hooks/dimentionHook';
import Colors from '../../../constants/Colors';
import {store} from '../../../Store/Store';
import {medium, regular, semiBold} from '../../../components/CustomFont/MyFont';
import {navigate} from '../../../Services/NavigationService';

const OnBoardScreen = () => {
  const flatlistRef = useRef<FlatList<number>>(null);
  const [Index, setIndex] = useState<number>(0);
  const Ellips = ({Index, scrollindex}: any) => {
    return (
      <View
        style={[
          styles.ellips,
          {backgroundColor: Index === scrollindex ? '#266FFF' : '#D9D9D9'},
        ]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, {top: useGetStatusBarHeight() + 20}]}>
        <Text style={[semiBold(moderateScale(26), Colors.black)]}>
          {ImagesData[Index]?.HeaderTxt}
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <FlatList
          data={ImagesData}
          ref={flatlistRef}
          horizontal
          style={{marginTop: useGetStatusBarHeight()}}
          initialNumToRender={1}
          pagingEnabled
          scrollEventThrottle={16}
          bounces={false}
          snapToAlignment="center"
          onScroll={event => {
            const index = Math.floor(
              Math.floor(event.nativeEvent.contentOffset.x) /
                Math.floor(event.nativeEvent.layoutMeasurement.width),
            );
            setIndex(index);
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}): any => {
            return (
              <View style={styles.BgImg}>
                <Image
                  source={item.path}
                  resizeMode="contain"
                  style={styles.image}
                />
              </View>
            );
          }}
        />
      </View>
      <Text style={[styles.description, regular(15, Colors.gray)]}>
        {ImagesData[Index]?.Text}
      </Text>
      <View style={[styles.BottomView, {bottom: useGetStatusBarHeight()}]}>
        <View style={styles.ellipsContainer}>
          {ImagesData.map((item, index) => {
            return <Ellips Index={index} scrollindex={Index} key={index} />;
          })}
        </View>
        <View style={styles.actionsContainer}>
          <Text
            onPress={() => {
              navigate('Login');
            }}
            style={[
              medium(moderateScale(14)),
              {
                marginEnd: 35,
                display: Index === 2 ? 'none' : 'flex',
                color: Colors.blue,
              },
            ]}>
            Skip
          </Text>
          {Index === 2 ? (
            <Pressable
              onPress={() => {
                navigate('Login');
              }}>
              <Image
                source={Images.GetStart}
                resizeMode="contain"
                style={styles.getStartButton}
              />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                flatlistRef.current?.scrollToIndex({
                  index: Index + 1,
                });
              }}>
              <Image
                resizeMode="contain"
                source={Images.Skip}
                style={styles.skipButton}
              />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

export default OnBoardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    position: 'absolute',
    zIndex: 1,
    paddingHorizontal: 20,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(130),
  },
  BgImg: {
    width: width,
    alignContent: 'center',
    justifyContent: 'center',
  },
  image: {
    width: moderateScale(254),
    alignSelf: 'center',
    height: moderateScale(295),
  },
  description: {
    marginTop: moderateScale(50),
    paddingHorizontal: moderateScale(20),
  },
  BottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    paddingHorizontal: 20,
  },
  ellipsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  ellips: {
    width: 20,
    height: 3,
    borderRadius: 30,
    marginHorizontal: 5,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  getStartButton: {
    width: 164,
    height: 50,
  },
  skipButton: {
    width: 50,
    height: 50,
  },
});
const ImagesData: any[] = [
  {
    name: 'Intro1',
    path: Images.intro1,
    HeaderTxt: 'Donec quis nunc at tempus lobortis',
    Text: 'Aliquam a lobortis erat. Curabitur nec leo sit amet leo mollis euismod. Mauris sit amet venenatis turpis. Cras malesuada a orci sed ullamcorper.',
  },
  {
    name: 'Intro2',
    path: Images.intro2,
    Text: 'Aliquam a lobortis erat. Curabitur nec leo sit amet leo mollis euismod. Mauris sit amet venenatis turpis. Cras malesuada a orci sed ullamcorper.',

    HeaderTxt: 'Donec diam felis, elementum nec lacus',
  },
  {
    name: 'Intro3',

    Text: 'Aliquam a lobortis erat. Curabitur nec leo sit amet leo mollis euismod. Mauris sit amet venenatis turpis. Cras malesuada a orci sed ullamcorper.',

    path: Images.intro3,
    HeaderTxt: 'Pellentesque habitant morbi tristique',
  },
];
