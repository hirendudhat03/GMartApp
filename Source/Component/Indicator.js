import React from 'react';
import {View, StyleSheet} from 'react-native';
import {scale} from '../Theme/Scalling';

export default Indicator = ({
  itemCount,
  currentIndex,
  indicatorStyle,
  indicatorContainerStyle,
  indicatorActiveColor,
  indicatorBorderActiveColor,
  indicatorBorderInActiveColor,
  indicatorInActiveColor,
  indicatorActiveWidth = 8,
}) => {
  return (
    <View style={[styles.container, indicatorContainerStyle]}>
      {renderIndicator(
        itemCount,
        currentIndex,
        indicatorStyle,
        indicatorActiveColor,
        indicatorBorderActiveColor,
        indicatorBorderInActiveColor,
        indicatorInActiveColor,
        indicatorActiveWidth,
      )}
    </View>
  );
};

export const renderIndicator = (
  count,
  currentIndex,
  indicatorStyle,
  indicatorActiveColor,
  indicatorBorderActiveColor,
  indicatorBorderInActiveColor,
  indicatorInActiveColor,
  indicatorActiveWidth,
) => {
  let indicators = [];


  for (let i = 0; i < count; i++) {
    indicators.push(
    //   <View style={[
    //     styles.indicatorRedius,
    // //    indicatorStyle,
    //     i === currentIndex
    //       ? indicatorActiveColor
    //         ? {
    //             ...styles.active,
    //             ...{
    //         //      backgroundColor: indicatorActiveColor,
    //         //      width: indicatorActiveWidth,
    //         borderColor: '#EE9393',
    //             },
    //           }
    //         : styles.active
    //       : {
    //        //   ...styles.inactive,
    //        //   ...{backgroundColor: indicatorInActiveColor},
    //        borderColor: '#EEECEC',
    //         },
    //   ]}>
        <View
          style={[
            styles.indicator,
            indicatorStyle,
            i === currentIndex
              ? indicatorActiveColor
                ? {
                    ...styles.active,
                    ...{
                      backgroundColor: indicatorActiveColor,
                      width: indicatorActiveWidth,
                    },
                  }
                : styles.active
              : {
                  ...styles.inactive,
                  ...{backgroundColor: indicatorInActiveColor},
                },
          ]}
        />
     // </View>,
    );
  }
  return indicators;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 8,
    margin:scale(3),
    marginTop:scale(15)
   // color:'blue'
    //backgroundColor:'#000'
  },
  indicatorRedius: {
    
    borderWidth: scale(3),
    marginRight: 5,
    borderRadius: 150 / 2,
  },
  active: {
    // width: 10,
    // height: 10,
    // borderRadius: 150/2,
    // marginRight: 5,
    margin:scale(3)
  },
  inactive: {
    //  backgroundColor:'#000'
  //  color:'blue'
  },
});
