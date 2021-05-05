import React, {Component, useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {scale} from '../Theme/Scalling';

import {withNavigation} from 'react-navigation';
import GlobalInclude from '../Global/GlobalInclude/globalinclude';
import {TouchableHighlight} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import helpers from '../Global/Helper/helper';

const DrawerMenu = ({navigation}) => {
  const [Drawer1, setDrawer1] = useState(GlobalInclude.GlobalColor.ColorWhite);
  const [Drawer2, setDrawer2] = useState(GlobalInclude.GlobalColor.ColorWhite);
  const [Drawer6, setDrawer6] = useState(GlobalInclude.GlobalColor.ColorWhite);
  const [Drawer7, setDrawer7] = useState(GlobalInclude.GlobalColor.ColorWhite);
  const [Drawer8, setDrawer8] = useState(GlobalInclude.GlobalColor.ColorWhite);

  const Drawern1 = () => {
    setDrawer1(GlobalInclude.GlobalColor.ColorRed);
    setDrawer2(GlobalInclude.GlobalColor.ColorWhite);
    setDrawer6(GlobalInclude.GlobalColor.ColorWhite);
    setDrawer7(GlobalInclude.GlobalColor.ColorWhite);
    setDrawer8(GlobalInclude.GlobalColor.ColorWhite);
    navigation.toggleDrawer();
    navigation.navigate('MyAccount');
  };
  const Drawern2 = () => {
    setDrawer1(GlobalInclude.GlobalColor.ColorWhite);
    setDrawer2(GlobalInclude.GlobalColor.ColorRed);
    setDrawer6(GlobalInclude.GlobalColor.ColorWhite);
    setDrawer7(GlobalInclude.GlobalColor.ColorWhite);
    setDrawer8(GlobalInclude.GlobalColor.ColorWhite);
    navigation.toggleDrawer();
    navigation.navigate('MyOrder');
  };

  const Drawern6 = () => {
    setDrawer1(GlobalInclude.GlobalColor.ColorWhite);
    setDrawer2(GlobalInclude.GlobalColor.ColorWhite);
    setDrawer6(GlobalInclude.GlobalColor.ColorRed);
    setDrawer7(GlobalInclude.GlobalColor.ColorWhite);
    setDrawer8(GlobalInclude.GlobalColor.ColorWhite);
    navigation.toggleDrawer();
    navigation.navigate('ContectUs');
  };
  const Drawern7 = () => {
    setDrawer1(GlobalInclude.GlobalColor.ColorWhite);
    setDrawer2(GlobalInclude.GlobalColor.ColorWhite);
    setDrawer6(GlobalInclude.GlobalColor.ColorWhite);
    setDrawer7(GlobalInclude.GlobalColor.ColorRed);
    setDrawer8(GlobalInclude.GlobalColor.ColorWhite);
    navigation.toggleDrawer();
    navigation.navigate('Offer');
  };
  const Drawern8 = () => {
    setDrawer1(GlobalInclude.GlobalColor.ColorWhite);
    setDrawer2(GlobalInclude.GlobalColor.ColorWhite);
    setDrawer6(GlobalInclude.GlobalColor.ColorWhite);
    setDrawer7(GlobalInclude.GlobalColor.ColorWhite);
    setDrawer8(GlobalInclude.GlobalColor.ColorRed);
    navigation.toggleDrawer();
    navigation.navigate('Help');
  };

  const signout = () => {
    AsyncStorage.removeItem('response.data.id');
    global.userid = null;
    navigation.toggleDrawer();
    navigation.replace('TabWithoutLogin');
    helpers.ToastShow('Logout Your Device', 'success');
  };
  const login = () => {
    navigation.toggleDrawer();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={() => navigation.navigate('MyAccount')}>
        <View
          style={{
            height: scale(100),
            width: '100%',
            backgroundColor: GlobalInclude.GlobalColor.ColorRed,
            justifyContent: 'center',
          }}>
          <View style={{flexDirection: 'row', marginTop: scale(15)}}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <GlobalInclude.GlobalImageBox
                uri={global.image == null ? false : true}
                source={
                  global.image == null
                    ? GlobalInclude.GlobalAssets.UserIcon
                    : global.image
                }
                style={
                  global.image == null
                    ? {
                        height: scale(30),
                        width: scale(30),
                        borderRadius: scale(50),
                      }
                    : {
                        height: '100%',
                        width: '100%',
                        borderRadius: scale(50),
                      }
                }
                viewstyle={{
                  height: scale(55),
                  width: scale(55),
                  borderRadius: scale(50),
                  backgroundColor: GlobalInclude.GlobalColor.ColorWhite,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            </View>
            <View style={{flex: 2, marginTop: scale(5)}}>
              <GlobalInclude.GlobalTextBox
                text={global.name}
                style={{
                  textAlign: 'left',
                  color: GlobalInclude.GlobalColor.ColorWhite,
                  fontSize: scale(17),
                }}
              />
              <GlobalInclude.GlobalTextBox
                text={global.email}
                style={{
                  textAlign: 'left',
                  color: GlobalInclude.GlobalColor.ColorWhite,
                  fontSize: scale(12),
                  marginTop: scale(3),
                }}
              />
            </View>
          </View>
        </View>
      </TouchableHighlight>

      {global.userid != null ? (
        <ScrollView>
          <View
            style={{
              height: scale(50),
              flexDirection: 'row',
              marginTop: scale(15),
            }}>
            <View
              style={{
                height: scale(50),
                width: '3%',
                backgroundColor: Drawer1,
              }}></View>
            <GlobalInclude.GlobalDrawerOption
              icon={GlobalInclude.GlobalAssets.Drawer1}
              iconstyle={styles.iconstyle}
              iconview={styles.iconview}
              text={global.my_account}
              style={styles.style}
              viewstyle={[styles.viewstyle]}
              onPress={() => Drawern1()}
            />
          </View>

          <View style={{height: scale(50), flexDirection: 'row'}}>
            <View
              style={{
                height: scale(50),
                width: '3%',
                backgroundColor: Drawer2,
              }}></View>
            <GlobalInclude.GlobalDrawerOption
              icon={GlobalInclude.GlobalAssets.MyOrder}
              iconstyle={styles.iconstyle}
              iconview={styles.iconview}
              text={global.my_order}
              style={styles.style}
              viewstyle={styles.viewstyle}
              onPress={() => Drawern2()}
            />
          </View>

          <View style={{height: scale(50), flexDirection: 'row'}}>
            <View
              style={{
                height: scale(50),
                width: '3%',
                backgroundColor: Drawer7,
              }}></View>
            <GlobalInclude.GlobalDrawerOption
              icon={GlobalInclude.GlobalAssets.Drawer5}
              iconstyle={styles.iconstyle}
              iconview={styles.iconview}
              text={global.offer}
              style={styles.style}
              viewstyle={styles.viewstyle}
              onPress={() => Drawern7()}
            />
          </View>

          <View style={{height: scale(50), flexDirection: 'row'}}>
            <View
              style={{
                height: scale(50),
                width: '3%',
                backgroundColor: Drawer6,
              }}></View>
            <GlobalInclude.GlobalDrawerOption
              icon={GlobalInclude.GlobalAssets.ContectUs}
              iconstyle={styles.iconstyle}
              iconview={styles.iconview}
              text={global.contect_us}
              style={styles.style}
              viewstyle={styles.viewstyle}
              onPress={() => Drawern6()}
            />
          </View>
          <View style={{height: scale(50), flexDirection: 'row'}}>
            <View
              style={{
                height: scale(50),
                width: '3%',
                backgroundColor: Drawer8,
              }}></View>
            <GlobalInclude.GlobalDrawerOption
              icon={GlobalInclude.GlobalAssets.Help}
              iconstyle={styles.iconstyle}
              iconview={styles.iconview}
              text={global.help}
              style={styles.style}
              viewstyle={styles.viewstyle}
              onPress={() => Drawern8()}
            />
          </View>
          <TouchableOpacity onPress={() => signout()}>
            <GlobalInclude.GlobalTextBox
              text={'Signout'}
              style={{
                fontSize: scale(17),
                color: GlobalInclude.GlobalColor.ColorWhite,
              }}
              viewstyle={{
                marginTop: scale(20),
                height: scale(40),
                marginHorizontal: scale(30),
                backgroundColor: GlobalInclude.GlobalColor.ColorRed,
                borderRadius: scale(30),
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: scale(30),
              }}
            />
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <ScrollView>
          <View
            style={{
              height: scale(50),
              flexDirection: 'row',
              marginTop: scale(15),
            }}>
            <View
              style={{
                height: scale(50),
                width: '3%',
                backgroundColor: Drawer7,
              }}></View>
            <GlobalInclude.GlobalDrawerOption
              icon={GlobalInclude.GlobalAssets.Drawer5}
              iconstyle={styles.iconstyle}
              iconview={styles.iconview}
              text={global.offer}
              style={styles.style}
              viewstyle={styles.viewstyle}
              onPress={() => Drawern7()}
            />
          </View>

          <View style={{height: scale(50), flexDirection: 'row'}}>
            <View
              style={{
                height: scale(50),
                width: '3%',
                backgroundColor: Drawer6,
              }}></View>
            <GlobalInclude.GlobalDrawerOption
              icon={GlobalInclude.GlobalAssets.ContectUs}
              iconstyle={styles.iconstyle}
              iconview={styles.iconview}
              text={global.contect_us}
              style={styles.style}
              viewstyle={styles.viewstyle}
              onPress={() => Drawern6()}
            />
          </View>
          <View style={{height: scale(50), flexDirection: 'row'}}>
            <View
              style={{
                height: scale(50),
                width: '3%',
                backgroundColor: Drawer8,
              }}></View>
            <GlobalInclude.GlobalDrawerOption
              icon={GlobalInclude.GlobalAssets.Help}
              iconstyle={styles.iconstyle}
              iconview={styles.iconview}
              text={global.help}
              style={styles.style}
              viewstyle={styles.viewstyle}
              onPress={() => Drawern8()}
            />
          </View>
          <TouchableOpacity onPress={() => login()}>
            <GlobalInclude.GlobalTextBox
              text={'Login'}
              style={{
                fontSize: scale(17),
                color: GlobalInclude.GlobalColor.ColorWhite,
              }}
              viewstyle={{
                marginTop: scale(20),
                height: scale(40),
                marginHorizontal: scale(30),
                backgroundColor: GlobalInclude.GlobalColor.ColorRed,
                borderRadius: scale(30),
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: scale(40),
              }}
            />
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
  // }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalInclude.GlobalColor.ColorWhite,
  },
  iconstyle: {
    height: scale(20),
    width: scale(20),
  },

  iconview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  style: {flex: 2, fontSize: scale(15), textAlign: 'left'},

  viewstyle: {
    height: scale(50),
    alignItems: 'center',
    width: '97%',
    marginLeft: scale(20),
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default withNavigation(DrawerMenu);
