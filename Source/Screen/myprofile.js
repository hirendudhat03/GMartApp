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
  TouchableHighlight,
} from 'react-native';
import GlobalInclude from '../Global/GlobalInclude/globalinclude';
import {scale} from '../Theme/Scalling';
import helpers from '../Global/Helper/helper';
import AsyncStorage from '@react-native-community/async-storage';

LogBox.ignoreAllLogs();

//defalt function
const home = ({navigation}) => {
  const French = () => {
    global.languageid = 1;
    KeywordApi();
    AsyncStorage.setItem('response.data.languageid', '1');
  };
  const English = () => {
    global.languageid = 2;
    KeywordApi();
    AsyncStorage.setItem('response.data.languageid', '2');
  };

  const KeywordApi = () => {
    global.global_loader_reff.show_loader(1);

    let url = 'api/app_keywords';

    var idto = global.languageid;
    var requestObj = {
      id_language: idto.toString(),
    };

    helpers.UrlReq(url, 'POST', requestObj).then((response) => {
      if (response.data != null) {
        if (response.status) {
          for (var i = 0; i <= 10; i++) {
            if (response.data[i].key == 'g_mart') {
              global.g_mart = response.data[i].value;
            } else if (response.data[i].key == 'top_deals') {
              global.top_deals = response.data[i].value;
            } else if (response.data[i].key == 'you_never_seen_it_before!') {
              global.you_never_seen_it_before = response.data[i].value;
            } else if (response.data[i].key == 'shop_from_top_categories') {
              global.shop_from_top_categories = response.data[i].value;
            } else if (response.data[i].key == 'see_more') {
              global.see_more = response.data[i].value;
            }
          }

          global.global_loader_reff.show_loader(0);
        } else {
          global.global_loader_reff.show_loader(0);
        }
      } else {
        global.global_loader_reff.show_loader(0);
      }
    });
  };

  const ShippingAddress = () => {
    // if (global.userid == null) {
    //   helpers.ToastShow('Login Your Device', 'fail');
    // } else {
    //   navigation.navigate('ShippingAddress', {status: 0});
    // }

    navigation.navigate('ShippingAddress', {status: 0});
  };
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
          height: scale(90),
          backgroundColor: GlobalInclude.GlobalColor.ColorRed,
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            height: scale(60),
            width: '100%',
            alignItems: 'center',
            marginTop: scale(18),
          }}>
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={{
              flex: 1,
              height: scale(25),
              width: scale(25),
              marginLeft: scale(20),
            }}>
            <GlobalInclude.GlobalImageBox
              source={GlobalInclude.GlobalAssets.DrawerIcon}
              style={{
                height: scale(25),
                width: scale(25),
                tintColor: '#fff',
              }}
            />
          </TouchableOpacity>

          <GlobalInclude.GlobalTextBox
            text="My profile"
            style={{
              color: GlobalInclude.GlobalColor.ColorWhite,
              fontSize: scale(20),
              fontFamily: GlobalInclude.GlobalFont.Bold,
            }}
            viewstyle={{flex: 1}}
          />

          {global.languageid == 1 ? (
            <TouchableOpacity
              style={{flex: 1, height: scale(30), marginRight: scale(15)}}
              onPress={() => English()}>
              <View
                style={{
                  flex: 1,
                  height: scale(30),
                  width: '100%',
                  alignItems: 'flex-end',
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    width: scale(60),
                    height: scale(30),
                    borderWidth: scale(1),
                    borderColor: GlobalInclude.GlobalColor.ColorWhite,
                    borderRadius: scale(20),
                    alignItems: 'center',
                  }}>
                  <GlobalInclude.GlobalTextBox
                    text="Fr"
                    style={{
                      color: GlobalInclude.GlobalColor.ColorWhite,
                      fontSize: scale(15),
                      fontFamily: GlobalInclude.GlobalFont.Bold,
                    }}
                    viewstyle={{flex: 1}}
                  />

                  <GlobalInclude.GlobalImageBox
                    source={GlobalInclude.GlobalAssets.Earth}
                    style={{
                      height: scale(13),
                      width: scale(13),
                      tintColor: '#fff',
                    }}
                    viewstyle={{flex: 1}}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{flex: 1, height: scale(30), marginRight: scale(15)}}
              onPress={() => French()}>
              <View
                style={{
                  flex: 1,
                  height: scale(30),
                  width: '100%',
                  marginRight: scale(20),
                  alignItems: 'flex-end',
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    width: scale(60),
                    height: scale(30),
                    borderWidth: scale(1),
                    borderColor: GlobalInclude.GlobalColor.ColorWhite,
                    borderRadius: scale(20),
                    alignItems: 'center',
                  }}>
                  <GlobalInclude.GlobalTextBox
                    text="En"
                    style={{
                      color: GlobalInclude.GlobalColor.ColorWhite,
                      fontSize: scale(15),
                      fontFamily: GlobalInclude.GlobalFont.Bold,
                    }}
                    viewstyle={{flex: 1}}
                  />

                  <GlobalInclude.GlobalImageBox
                    source={GlobalInclude.GlobalAssets.Earth}
                    style={{
                      height: scale(13),
                      width: scale(13),
                      tintColor: '#fff',
                    }}
                    viewstyle={{flex: 1}}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* <GlobalInclude.GlobalInputBox
          icon={GlobalInclude.GlobalAssets.Search}
          iconstyle={{
            height: scale(17),
            width: scale(17),
            marginLeft: scale(20),
            tintColor: GlobalInclude.GlobalColor.ColorBlack,
          }}
          viewstyle={{
            height: scale(40),
            width: '90%',
            marginHorizontal: '5%',
            backgroundColor: GlobalInclude.GlobalColor.ColorWhite,
            borderRadius: scale(50),
            flexDirection: 'row',
            alignItems: 'center',
          }}
          style={{width: '80%', marginLeft: scale(10)}}
        /> */}
      </View>

      {/* Design */}
      <ScrollView>
        <View
          style={{
            height: scale(120),
            width: '100%',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('MyAccount')}>
            <View style={{flexDirection: 'row'}}>
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
                    borderRadius: scale(55),
                    backgroundColor: GlobalInclude.GlobalColor.ColorWhite,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
              </View>
              <View style={{flex: 3}}>
                <GlobalInclude.GlobalTextBox
                  text={global.name}
                  style={{
                    textAlign: 'left',
                    color: GlobalInclude.GlobalColor.ColorBlack,
                    fontSize: scale(17),
                  }}
                />
                <GlobalInclude.GlobalTextBox
                  text={global.email}
                  style={{
                    textAlign: 'left',
                    color: GlobalInclude.GlobalColor.LightGray,
                    fontSize: scale(12),
                    marginTop: scale(3),
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* new line */}
        <TouchableOpacity onPress={() => ShippingAddress()}>
          <View style={styles.innerview}>
            <View style={{flex: 3}}>
              <GlobalInclude.GlobalTextBox
                text={'Shipping addresses'}
                style={styles.firsttext}
              />
              <GlobalInclude.GlobalTextBox
                text={'3 addresses'}
                style={styles.secondtext}
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

        {/* new line */}
        {/* <TouchableOpacity onPress={() => navigation.navigate('PaymentMethod')}>
          <View style={styles.innerview}>
            <View style={{flex: 3}}>
              <GlobalInclude.GlobalTextBox
                text={'Payment method'}
                style={styles.firsttext}
              />
              <GlobalInclude.GlobalTextBox
                text={'Visa **34'}
                style={styles.secondtext}
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
        <View style={styles.viewline}></View> */}

        {/* new line */}
        <TouchableOpacity onPress={() => navigation.navigate('PromoCodes')}>
          <View style={styles.innerview}>
            <View style={{flex: 3}}>
              <GlobalInclude.GlobalTextBox
                text={'Promocodes'}
                style={styles.firsttext}
              />
              <GlobalInclude.GlobalTextBox
                text={'You have special promocodes'}
                style={styles.secondtext}
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

        {/* new line */}
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <View style={styles.innerview}>
            <View style={{flex: 1}}>
              <GlobalInclude.GlobalTextBox
                text={'Setting'}
                style={styles.firsttext}
              />
              <GlobalInclude.GlobalTextBox
                text={'Notification password'}
                style={styles.secondtext}
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
