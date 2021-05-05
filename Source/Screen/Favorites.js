//import React
import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  LogBox,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import GlobalInclude from '../Global/GlobalInclude/globalinclude';
import {scale} from '../Theme/Scalling';
import helpers from '../Global/Helper/helper';
import AsyncStorage from '@react-native-community/async-storage';

LogBox.ignoreAllLogs();
//variable
const dummyArray = [
  {id: '1', value: 'A'},
  {id: '2', value: 'B'},
  {id: '3', value: 'C'},
  {id: '4', value: 'D'},
  {id: '5', value: 'E'},
];

//defalt function
const home = ({navigation}) => {
  const [ListItems] = useState(dummyArray);
  const [Data, setData] = useState();
  const [UnableData, setUnableData] = useState(false);

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
          favorites();
          // global.global_loader_reff.show_loader(0);
        } else {
          global.global_loader_reff.show_loader(0);
        }
      } else {
        global.global_loader_reff.show_loader(0);
      }
    });
  };

  const Addtocart = (id_Unique, attribute_combinations) => {
    global.global_loader_reff.show_loader(1);

    let url = 'api/cart/add_product';

    var IdUser;

    if (global.userid == null) {
      IdUser = global.deviceid;
    } else {
      IdUser = global.userid;
    }

    var requestObj = {
      id_language: global.languageid,
      id_user: IdUser,
      id_unique: id_Unique,
      id_unique_attribute_values: attribute_combinations,
      id_currency: global.currencyid,
    };

    console.log('Addtocart =>', requestObj);

    helpers.UrlReq(url, 'POST', requestObj).then((response) => {
      if (response != null) {
        if (response.status) {
          global.global_loader_reff.show_loader(0);
          helpers.ToastShow(response.message, 'success');
          favorites();
        } else {
          global.global_loader_reff.show_loader(0);
          helpers.ToastShow(response.message, 'fail');
          alert(response.message);
        }
      } else {
        global.global_loader_reff.show_loader(0);
        helpers.ToastShow(response.message, 'fail');
        alert(response.message);
      }
    });
  };

  const RemoveWishlist = (is_wishlist) => {
    global.global_loader_reff.show_loader(1);

    let url = 'api/wishlist/remove';

    var requestObj = {
      id_language: global.languageid,
      id_wishlist: is_wishlist,
    };

    helpers.UrlReq(url, 'POST', requestObj).then((response) => {
      if (response != null) {
        if (response.status) {
          global.global_loader_reff.show_loader(0);
          helpers.ToastShow(response.message, 'success');
          favorites();
        } else {
          global.global_loader_reff.show_loader(0);
          helpers.ToastShow(response.message, 'fail');
          alert(response.message);
        }
      } else {
        global.global_loader_reff.show_loader(0);
        helpers.ToastShow(response.message, 'fail');
        alert(response.message);
      }
    });
  };

  const favorites = () => {
    global.global_loader_reff.show_loader(1);

    let url = 'api/wishlist/get';

    var IdUser;

    if (global.userid == null) {
      IdUser = global.deviceid;
    } else {
      IdUser = global.userid;
    }

    var requestObj = {
      id_language: global.languageid,
      id_user: IdUser,
    };

    helpers.UrlReq(url, 'POST', requestObj).then((response) => {
      if (response.data != null) {
        if (response.status) {
          setData(response.data);
          setUnableData(false);
          global.global_loader_reff.show_loader(0);
        } else {
          global.global_loader_reff.show_loader(0);
        }
      } else {
        setUnableData(true);
        global.global_loader_reff.show_loader(0);
      }
    });
  };

  // useEffect(() => {
  //   favorites();
  // }, []);

  useEffect(() => {
    const listener = navigation.addListener('didFocus', () => favorites());

    favorites();

    return function cleanup() {
      listener.remove();
    };
  }, []);

  useLayoutEffect(() => {
    //console.log('USE LAYOUT EFFECT FUNCTION TRIGGERED');
    //CartProduct()
  });

  //flatlist design
  const AllCategory = ({item}) => {
    return (
      <View style={{padding: scale(7), marginTop: scale(10)}}>
        <GlobalInclude.GlobalTextBox
          text={'Summer'}
          style={{color: GlobalInclude.GlobalColor.ColorWhite}}
          viewstyle={{
            width: scale(100),
            height: scale(40),
            borderRadius: scale(40),
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: GlobalInclude.GlobalColor.ColorRed,
          }}
        />
      </View>
    );
  };

  const TopDeals = ({item}) => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            height: scale(120),
            marginHorizontal: scale(20),
            borderRadius: scale(7),
            marginTop: scale(10),
            backgroundColor: GlobalInclude.GlobalColor.ColorWhite,
          }}>
          <GlobalInclude.GlobalImageBox
            uri={true}
            source={item.image_name}
            style={{
              height: '100%',
              width: '100%',
              borderTopLeftRadius: scale(7),
              borderBottomLeftRadius: scale(7),
            }}
            viewstyle={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderTopLeftRadius: scale(7),
              borderBottomLeftRadius: scale(7),
            }}
          />

          <View style={{flex: 2, marginLeft: scale(15)}}>
            <View style={{flexDirection: 'row', marginTop: scale(7)}}>
              <GlobalInclude.GlobalTextBox
                text={item.title}
                style={{
                  textAlign: 'left',
                  fontSize: scale(15),
                  color: GlobalInclude.GlobalColor.LightGray,
                }}
                viewstyle={{flex: 1}}
              />
              <TouchableOpacity
                onPress={() => RemoveWishlist(item.id_wishlist)}>
                <GlobalInclude.GlobalImageBox
                  source={GlobalInclude.GlobalAssets.Cancel}
                  style={{
                    height: scale(15),
                    width: scale(12),
                  }}
                  viewstyle={{
                    flex: 1,
                    height: scale(15),
                    width: scale(12),
                    margin: scale(5),
                    marginRight: scale(10),
                  }}
                />
              </TouchableOpacity>
            </View>

            <GlobalInclude.GlobalTextBox
              text={'Shirt'}
              style={{textAlign: 'left', fontSize: scale(20)}}
            />

            <View style={{flex: 2}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <GlobalInclude.GlobalTextBox
                    text={'Color:'}
                    style={{
                      textAlign: 'left',
                      fontSize: scale(14),
                      color: GlobalInclude.GlobalColor.LightGray,
                    }}
                  />
                  <GlobalInclude.GlobalTextBox
                    text={'Blue'}
                    style={{textAlign: 'left', fontSize: scale(14)}}
                  />
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <GlobalInclude.GlobalTextBox
                    text={'Size:'}
                    style={{
                      textAlign: 'left',
                      fontSize: scale(14),
                      color: GlobalInclude.GlobalColor.LightGray,
                    }}
                  />
                  <GlobalInclude.GlobalTextBox
                    text={'L'}
                    style={{textAlign: 'left', fontSize: scale(14)}}
                  />
                </View>
              </View>
            </View>
            <View style={{flex: 2}}>
              <View style={{flexDirection: 'row'}}>
                <GlobalInclude.GlobalTextBox
                  text={item.other_info.prices.price_usd + '$'}
                  style={{textAlign: 'left', fontSize: scale(15)}}
                  viewstyle={{flex: 1}}
                />
                <GlobalInclude.GlobalTextBox
                  text={'Size:L'}
                  style={{textAlign: 'left', fontSize: scale(15)}}
                  viewstyle={{flex: 1}}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{marginHorizontal: scale(20), alignItems: 'flex-end'}}>
          <TouchableOpacity
            onPress={() =>
              Addtocart(
                item.id_unique,
                item.other_info.attribute_combinations[0][0],
              )
            }>
            <GlobalInclude.GlobalImageBox
              source={GlobalInclude.GlobalAssets.Bag1}
              style={{height: scale(18), width: scale(18)}}
              viewstyle={{
                height: scale(45),
                width: scale(45),
                borderRadius: scale(50),
                backgroundColor: GlobalInclude.GlobalColor.ColorRed,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: scale(-25),
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
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
            text="Favorites"
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
        {/* <View
          style={{
            height: scale(110),
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            backgroundColor: '#fff',
          }}>
          <FlatList
            data={ListItems}
            //  ItemSeparatorComponent={ItemSeparatorView}
            //Item Separator View
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={AllCategory}
            keyExtractor={(item, index) => index.toString()}
          />

          <View
            style={{
              flexDirection: 'row',
              height: scale(40),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <GlobalInclude.GlobalImageBox
                source={GlobalInclude.GlobalAssets.Filter}
                style={{
                  height: scale(15),
                  width: scale(15),
                  marginLeft: scale(20),
                  fontSize: scale(10),
                }}
                viewstyle={{
                  height: scale(40),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
              <GlobalInclude.GlobalTextBox
                text={'Filters'}
                style={{marginLeft: scale(10)}}
                viewstyle={{
                  height: scale(40),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <GlobalInclude.GlobalImageBox
                source={GlobalInclude.GlobalAssets.PriceUpDown}
                style={{
                  height: scale(15),
                  width: scale(15),
                  marginLeft: scale(15),
                }}
                viewstyle={{
                  height: scale(40),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
              <GlobalInclude.GlobalTextBox
                text={'Price: lowest to high'}
                style={{marginLeft: scale(10), fontSize: scale(10)}}
                viewstyle={{
                  height: scale(40),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <GlobalInclude.GlobalImageBox
                source={GlobalInclude.GlobalAssets.Category}
                style={{
                  height: scale(15),
                  width: scale(15),
                  marginLeft: scale(10),
                }}
                viewstyle={{
                  height: scale(40),
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: scale(40),
                }}
              />
            </View>
          </View>
        </View> */}

        {UnableData == true ? (
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: scale(200),
            }}>
            <GlobalInclude.GlobalTextBox
              text={'Favorite List Empty'}
              style={{fontSize: scale(17)}}
            />
          </View>
        ) : (
          <View>
            <FlatList
              data={Data}
              showsHorizontalScrollIndicator={false}
              renderItem={TopDeals}
              contentContainerStyle={{marginBottom: scale(30)}}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default home;
