//import React
import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  LogBox,
  StatusBar,
  Modal,
  TouchableOpacity,
} from 'react-native';
import GlobalInclude from '../Global/GlobalInclude/globalinclude';
import {scale} from '../Theme/Scalling';
import helpers from '../Global/Helper/helper';
import AsyncStorage from '@react-native-community/async-storage';

LogBox.ignoreAllLogs();
//variable
const dummyArray = [
  {idi: '1', value: 'A'},
  {idi: '2', value: 'B'},
  {idi: '3', value: 'C'},
];

//defalt function
const home = ({navigation}) => {
  const [ListItems] = useState(dummyArray);
  const [Number, setNumber] = useState([]);
  const [Data, setData] = useState();
  const [id_unique, setid_unique] = useState();
  const [SizeAlert, setSizeAlert] = useState(false);
  const [ItemTotal, setItemTotal] = useState(0);
  const [Promocode, setPromocode] = useState('');
  const [UnableData, setUnableData] = useState(false);

  const deleteCart = () => {};

  const updatePrice = (value, index, qut, id, totprice) => {
    var clone = Data;

    console.log('minus', (parseInt(qut, 10) - 1).toString());
    if (value === 1) {
      clone[index].quantity = (parseInt(qut, 10) - 1).toString();
      // clone[index].other_info.final_price = totprice + clone[index].quantity;
    } else {
      clone[index].quantity = parseInt(qut, 10) + 1;
    }

    setData([...clone]);

    global.global_loader_reff.show_loader(1);

    let url = 'api/cart/update_quantity';

    var IdUser;

    if (global.userid == null) {
      IdUser = global.deviceid;
    } else {
      IdUser = global.userid;
    }

    var requestObj = {
      id_language: global.languageid,
      id_user: IdUser,
      quantity: clone[index].quantity,
      id: id,
    };

    helpers.UrlReq(url, 'POST', requestObj).then((response) => {
      if (response != null) {
        if (response.status) {
          global.global_loader_reff.show_loader(0);
          helpers.ToastShow(response.message, 'success');

          // productdetail();
        } else {
          global.global_loader_reff.show_loader(0);
          helpers.ToastShow(response.message, 'fail');
        }
      } else {
        global.global_loader_reff.show_loader(0);
        helpers.ToastShow(response.message, 'fail');
      }
    });
  };

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
          CartProduct();
          // global.global_loader_reff.show_loader(0);
        } else {
          global.global_loader_reff.show_loader(0);
        }
      } else {
        global.global_loader_reff.show_loader(0);
      }
    });
  };

  //flatlist design

  const sizealert = (visible, id_unique) => {
    setSizeAlert(visible);
    setid_unique(id_unique);
  };

  const Deleteitemcart = (id_unique) => {
    global.global_loader_reff.show_loader(1);

    let url = 'api/cart/delete_product';

    var IdUser;

    if (global.userid == null) {
      IdUser = global.deviceid;
    } else {
      IdUser = global.userid;
    }

    var requestObj = {
      id_language: global.languageid,
      id_user: IdUser,
      id: id_unique,
    };

    helpers.UrlReq(url, 'POST', requestObj).then((response) => {
      if (response != null) {
        if (response.status) {
          // setData(response.data);
          CartProduct();
          global.global_loader_reff.show_loader(0);
          helpers.ToastShow(response.message, 'success');
          // sizealert(false);
        } else {
          global.global_loader_reff.show_loader(0);
          helpers.ToastShow(response.message, 'fail');
        }
      } else {
        global.global_loader_reff.show_loader(0);
        helpers.ToastShow(response.message, 'fail');
      }
    });
  };
  const Emptyitemcart = () => {
    global.global_loader_reff.show_loader(1);

    let url = 'api/cart/empty_cart';

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
      if (response != null) {
        if (response.status) {
          setData(response.data);
          global.global_loader_reff.show_loader(0);
          helpers.ToastShow(response.message, 'success');
          sizealert(false);
          CartProduct();
        } else {
          global.global_loader_reff.show_loader(0);
          helpers.ToastShow(response.message, 'fail');
        }
      } else {
        global.global_loader_reff.show_loader(0);
        helpers.ToastShow(response.message, 'fail');
      }
    });
  };

  const CartProduct = () => {
    global.global_loader_reff.show_loader(1);

    let url = 'api/cart/get_product';

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
          global.bagnum = 0;
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

  useEffect(() => {
    const listener = navigation.addListener('didFocus', () => CartProduct());

    CartProduct();

    return function cleanup() {
      listener.remove();
    };
  }, []);

  useLayoutEffect(() => {
    //console.log('USE LAYOUT EFFECT FUNCTION TRIGGERED');
    //CartProduct()
  });

  const TopDeals = ({item, index}) => {
    var a = 0;

    for (var i = 0; i <= index; i++) {
      a = a + item.quantity * item.other_info.final_price[0];
    }
    setItemTotal(a);

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductDetail', {id_Unique: item.id_unique})
        }>
        <View
          style={{
            flexDirection: 'row',
            height: scale(120),
            marginHorizontal: scale(20),
            borderRadius: scale(10),
            marginTop: scale(10),
            backgroundColor: GlobalInclude.GlobalColor.ColorWhite,
          }}>
          <GlobalInclude.GlobalImageBox
            uri={true}
            source={item.image_name}
            style={{
              height: '100%',
              width: '100%',
              borderTopLeftRadius: scale(10),
              borderBottomLeftRadius: scale(10),
              resizeMode: 'stretch',
            }}
            viewstyle={{
              flex: 1,
              alignItems: 'stretch',
              justifyContent: 'center',
              borderTopLeftRadius: scale(10),
              borderBottomLeftRadius: scale(10),
            }}
          />

          <View style={{flex: 2, marginLeft: scale(15)}}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: scale(7),
                height: scale(30),
              }}>
              <GlobalInclude.GlobalTextBox
                text={item.title}
                style={{textAlign: 'left', fontSize: scale(17)}}
                viewstyle={{flex: 3}}
                numberOfLines={1}
              />

              <TouchableOpacity
                style={{flex: 1, alignItems: 'flex-end'}}
                onPress={() => Deleteitemcart(item.id)}>
                <GlobalInclude.GlobalImageBox
                  source={GlobalInclude.GlobalAssets.Delete}
                  style={{
                    height: scale(25),
                    width: scale(25),
                    margin: scale(5),
                    marginRight: scale(10),
                  }}
                  viewstyle={{flex: 1}}
                />
              </TouchableOpacity>
            </View>

            <View style={{flex: 2, marginTop: scale(-5)}}>
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

            <View style={{flex: 2, marginTop: scale(-20)}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => {
                      if (item.quantity > 0) {
                        updatePrice(
                          1,
                          index,
                          item.quantity,
                          item.id,
                          item.other_info.final_price,
                        );
                      }
                    }}>
                    <GlobalInclude.GlobalImageBox
                      source={GlobalInclude.GlobalAssets.Minus}
                      viewstyle={{
                        height: scale(40),
                        width: scale(40),
                        borderRadius: scale(40),
                        backgroundColor: GlobalInclude.GlobalColor.ColorRed,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    />
                  </TouchableOpacity>
                  <GlobalInclude.GlobalTextBox
                    text={item.quantity}
                    style={{fontSize: scale(17)}}
                    viewstyle={{
                      height: scale(40),
                      width: scale(40),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      updatePrice(2, index, item.quantity, item.id);
                    }}>
                    <GlobalInclude.GlobalImageBox
                      source={GlobalInclude.GlobalAssets.Plus}
                      viewstyle={{
                        height: scale(40),
                        width: scale(40),
                        borderRadius: scale(40),
                        backgroundColor: GlobalInclude.GlobalColor.ColorRed,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <GlobalInclude.GlobalTextBox
                  text={item.quantity * item.other_info.final_price + '$'}
                  style={{
                    textAlign: 'right',
                    fontSize: scale(15),
                    marginRight: scale(15),
                  }}
                  viewstyle={{
                    flex: 1,
                    height: scale(40),

                    justifyContent: 'center',
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
            text="My Bag"
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
        {UnableData == true ? (
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: scale(200),
            }}>
            <GlobalInclude.GlobalTextBox
              text={'My Bag Empty'}
              style={{fontSize: scale(17)}}
            />
          </View>
        ) : (
          <View>
            <FlatList
              data={Data}
              extraData={ListItems}
              showsHorizontalScrollIndicator={false}
              renderItem={TopDeals}
              keyExtractor={(item, index) => index.toString()}
            />

            <GlobalInclude.GlobalInputBox
              iconright={GlobalInclude.GlobalAssets.RightArrow}
              placeholder={'Enter Your Promo Code'}
              onChangeText={(value) => setPromocode(value)}
              style={{flex: 4, marginLeft: scale(15)}}
              viewstyle={{
                flexDirection: 'row',
                height: scale(40),
                marginHorizontal: scale(20),
                backgroundColor: GlobalInclude.GlobalColor.ColorWhite,
                marginTop: scale(20),
                borderBottomLeftRadius: scale(7),
                borderBottomRightRadius: scale(40),
                borderTopLeftRadius: scale(12),
                borderTopRightRadius: scale(40),
              }}
              iconstyleright={{
                height: scale(15),
                width: scale(15),
                tintColor: '#fff',
              }}
              viewstyleright={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000',
                height: scale(40),
                width: scale(40),
                borderRadius: scale(40),
              }}
              viewstylerightmain={{flex: 1, alignItems: 'flex-end'}}
            />

            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: scale(30),
                marginTop: scale(15),
              }}>
              <GlobalInclude.GlobalTextBox
                text={'Total Amount'}
                style={{
                  textAlign: 'left',
                  fontSize: scale(15),
                  color: GlobalInclude.GlobalColor.LightGray,
                }}
                viewstyle={{flex: 1}}
              />
              <GlobalInclude.GlobalTextBox
                text={ItemTotal + '$'}
                style={{textAlign: 'right', fontSize: scale(17)}}
                viewstyle={{flex: 1}}
              />
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CheckOut', {
                  Promocode: Promocode,
                  TotalPrice: ItemTotal,
                })
              }>
              <GlobalInclude.GlobalTextBox
                text={'CHECK OUT'}
                style={{
                  fontSize: scale(17),
                  color: GlobalInclude.GlobalColor.ColorWhite,
                }}
                viewstyle={{
                  height: scale(40),
                  marginHorizontal: scale(20),
                  backgroundColor: GlobalInclude.GlobalColor.ColorRed,
                  borderRadius: scale(40),
                  marginTop: scale(15),
                  marginBottom: scale(30),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Model */}
      <Modal visible={SizeAlert} transparent={true} animationType={'slide'}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: GlobalInclude.GlobalColor.ColorWhite,
              marginHorizontal: scale(50),
              marginTop: scale(50),
              paddingBottom: scale(20),
            }}>
            <TouchableOpacity onPress={() => sizealert(false)}>
              <GlobalInclude.GlobalImageBox
                source={GlobalInclude.GlobalAssets.Cancel}
                style={{height: scale(20), width: scale(20), margin: scale(5)}}
                viewstyle={{alignItems: 'flex-end'}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Deleteitemcart(id_unique)}>
              <GlobalInclude.GlobalTextBox
                text={'Delete'}
                style={{fontSize: scale(15)}}
              />
            </TouchableOpacity>
            <View
              style={{
                height: scale(1),
                backgroundColor: GlobalInclude.GlobalColor.Gray,
                marginHorizontal: scale(20),
                marginVertical: scale(10),
              }}></View>
            <TouchableOpacity onPress={() => Emptyitemcart()}>
              <GlobalInclude.GlobalTextBox
                text={'Empty Cart'}
                style={{fontSize: scale(15)}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({});

export default home;
