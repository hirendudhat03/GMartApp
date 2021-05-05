import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import {scale} from '../Theme/Scalling';
import GlobalInclude from '../Global/GlobalInclude/globalinclude';

const TabMenu = (props) => {
  return (
    <View
      style={[
        {
          height: scale(90),
          width: '100%',
          backgroundColor: GlobalInclude.GlobalColor.ColorTab,
        },
        props.viewstyle,
      ]}>
      <View
        style={{height: scale(90), alignItems: 'center', marginTop: scale(15)}}>
        {props.notification == true ? (
          <View
            style={{
              height: scale(15),
              width: scale(15),
              backgroundColor:
                global.bagnum == 0
                  ? GlobalInclude.GlobalColor.ColorTab
                  : GlobalInclude.GlobalColor.ColorRed,
              borderRadius: scale(15),
              marginBottom: scale(-10),
              marginTop: scale(-5),
              marginLeft: scale(35),
              // borderColor: GlobalInclude.GlobalColor.ColorRed,
              // borderWidth: scale(1),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <GlobalInclude.GlobalTextBox
              text={global.bagnum == 0 ? '' : global.bagnum}
              style={{color: GlobalInclude.GlobalColor.ColorWhite}}
            />
          </View>
        ) : null}

        <Image
          source={props.source}
          style={[{height: scale(23), width: scale(25)}, props.style]}
        />
        <Text style={{fontSize: scale(12), color: '#fff', marginTop: scale(5)}}>
          {props.text}
        </Text>
      </View>
    </View>
  );
};

export default TabMenu;
