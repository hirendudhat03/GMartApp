//import React
import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  LogBox,
  TouchableOpacity,
  StatusBar,
  TouchableOpacityBase,
} from 'react-native';
import GlobalInclude from '../Global/GlobalInclude/globalinclude';
import {scale} from '../Theme/Scalling';

LogBox.ignoreAllLogs();

const home = ({navigation}) => {
  return (
    <View style={{flex: 1, marginBottom: scale(30)}}>
      {/* Header */}

      <StatusBar
        backgroundColor={GlobalInclude.GlobalColor.ColorRed}
        barStyle="light-content"
        translucent
      />

      <View
        style={{
          height: scale(80),
          backgroundColor: GlobalInclude.GlobalColor.ColorRed,
          justifyContent: 'flex-end',
        }}>
        <View style={{flexDirection: 'row', height: scale(50)}}>
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <GlobalInclude.GlobalImageBox
                source={GlobalInclude.GlobalAssets.LeftIcon2}
                style={{
                  height: scale(20),
                  width: scale(14),
                  marginLeft: scale(20),
                }}
                viewstyle={{
                  height: scale(40),
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}
              />
            </TouchableOpacity>
          </View>
          <GlobalInclude.GlobalTextBox
            text={'Help'}
            style={{
              fontSize: scale(20),
              color: GlobalInclude.GlobalColor.ColorWhite,
              textAlign: 'center',
            }}
            viewstyle={{justifyContent: 'center', height: scale(40)}}
          />
          <View style={{flex: 1}}>
            {/* <GlobalInclude.GlobalImageBox
              source={GlobalInclude.GlobalAssets.Search}
              style={{
                height: scale(20),
                width: scale(20),
                marginRight: scale(20),
                tintColor: GlobalInclude.GlobalColor.ColorWhite,
              }}
              viewstyle={{
                height: scale(40),
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
            /> */}
          </View>
        </View>
      </View>

      {/* Design */}
      <ScrollView style={{marginTop: scale(10)}}>
        {/* new line About Us*/}
        <TouchableOpacity onPress={() => navigation.navigate('AboutUs')}>
          <View style={styles.innerview}>
            <View style={{flex: 3}}>
              <GlobalInclude.GlobalTextBox
                text={'About Us'}
                style={styles.firsttext}
                viewstyle={{justifyContent: 'center', height: '100%'}}
              />
            </View>
            <View style={{flex: 1}}>
              <GlobalInclude.GlobalImageBox
                source={GlobalInclude.GlobalAssets.RightArrow2}
                style={styles.arrowstyle}
                viewstyle={styles.arrowviewstyle}
              />
            </View>
          </View>
          <View style={styles.viewline}></View>
        </TouchableOpacity>

        {/* new line Private Policy*/}
        <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
          <View style={styles.innerview}>
            <View style={{flex: 3}}>
              <GlobalInclude.GlobalTextBox
                text={'Privacy Policy'}
                style={styles.firsttext}
                viewstyle={{justifyContent: 'center', height: '100%'}}
              />
            </View>
            <View style={{flex: 1}}>
              <GlobalInclude.GlobalImageBox
                source={GlobalInclude.GlobalAssets.RightArrow2}
                style={styles.arrowstyle}
                viewstyle={styles.arrowviewstyle}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.viewline}></View>

        {/* new line Tearms and Condition*/}
        <TouchableOpacity
          onPress={() => navigation.navigate('TearmsAndCondition')}>
          <View style={styles.innerview}>
            <View style={{flex: 3}}>
              <GlobalInclude.GlobalTextBox
                text={'Tearms And Condition'}
                style={styles.firsttext}
                viewstyle={{justifyContent: 'center', height: '100%'}}
              />
            </View>
            <View style={{flex: 1}}>
              <GlobalInclude.GlobalImageBox
                source={GlobalInclude.GlobalAssets.RightArrow2}
                style={styles.arrowstyle}
                viewstyle={styles.arrowviewstyle}
              />
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewline: {
    height: scale(1),
    backgroundColor: GlobalInclude.GlobalColor.ColorBlack,
    marginVertical: scale(10),
  },
  arrowviewstyle: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: scale(50),
  },
  arrowstyle: {height: scale(15), width: scale(10), tintColor: '#000'},

  firsttext: {fontSize: scale(17), textAlign: 'left'},

  secondtext: {
    fontSize: scale(12),
    textAlign: 'left',
    color: GlobalInclude.GlobalColor.LightGray,
  },

  innerview: {
    flexDirection: 'row',
    height: scale(50),
    width: '90%',
    marginHorizontal: '5%',
  },
});

export default home;
