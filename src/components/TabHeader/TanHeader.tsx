import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import Colors from '../../constants/Colors';
import {moderateScale} from '../../constants/Utils';
import Fonts from '../../constants/Fonts';

type Props = {
  headerText: string;
  index: number;
  length: number;
};

const TabHeader: FC<Props> = ({headerText, index, length}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.progressBarContainer}>
          {Array.from({length: length}).map((item, Index) => {
            return (
              <View
                key={Index}
                style={[
                  styles.progressBarSegment,
                  Index <= index && styles.activeSegment,
                  Index !== 0 && styles.segmentMargin,
                ]}
              />
            );
          })}
        </View>

        <Text style={styles.headerText}>{headerText}</Text>
      </View>
    </View>
  );
};

export default TabHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  headerContainer: {
    width: '100%',
    paddingBottom: 10,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginBottom: 10,
    backgroundColor: '#FAFAFA',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3, // For Android shadow
  },
  progressBarContainer: {
    flexDirection: 'row',
  },
  progressBarSegment: {
    flex: 1,
    height: 3,
    backgroundColor: '#D8D8D8',
  },
  activeSegment: {
    backgroundColor: Colors.green,
  },
  segmentMargin: {
    marginLeft: 6,
  },
  headerText: {
    fontFamily: Fonts.THICCCBOMedium,
    marginTop: moderateScale(13),
    color: Colors.black,
    fontSize: moderateScale(15),
    marginStart: 20,
  },
});
