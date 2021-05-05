import React, {useEffect, useState} from 'react';
import {View, FlatList, StatusBar, TouchableOpacity} from 'react-native';
import GlobalInclude from '../Global/GlobalInclude/globalinclude';
import {scale} from '../Theme/Scalling';
import helpers from '../Global/Helper/helper';

const dummyArray = [
  {id: '1', value: 'A'},
  {id: '2', value: 'B'},
  {id: '3', value: 'C'},
  {id: '4', value: 'D'},
  {id: '5', value: 'E'},
];

const Login = ({navigation}) => {
  const [Number, setNumber] = useState([1]);
  const [IndexNo, setIndexNo] = useState(0);
  const [CurrentIndex, setCurrentIndex] = useState(
    navigation.state.params.index,
  );

  const [Data, setData] = useState();
  const [CategoryData, setCategoryData] = useState(
    navigation.state.params.CategoryItem,
  );
  const [Check, setCheck] = useState();
  const [UnableData, setUnableData] = useState(false);

  const SubCategory = (id, index) => {
    global.global_loader_reff.show_loader(1);

    let url = 'api/product/get';

    var requestObj = {
      id_category: id,
      search_value: '',
      is_popular: '',
      id_language: '1',
      start: '0',
      limit: '10',
      id_user: '',
      min_price: '',
      max_price: '',
      price_order_by: '',
    };

    helpers.UrlReq(url, 'POST', requestObj).then((response) => {
      if (response.data != null) {
        if (response.status) {
          setData(response.data);

          setCheck(index);
          setUnableData(false);
          global.global_loader_reff.show_loader(0);
        } else {
          global.global_loader_reff.show_loader(0);
        }
      } else {
        global.global_loader_reff.show_loader(0);
        setUnableData(true);
        setCheck(index);
      }
    });
  };
  //flatlist design

  useEffect(() => {
    SubCategory(
      navigation.state.params.id_Unique,
      navigation.state.params.index,
    );
  }, []);

  const updatePrice = (value, index, qut, id) => {
    var clone = Data;

    console.log('minus', (parseInt(qut, 10) - 1).toString());
    if (value === 1) {
      clone[index].wishlist_id = (parseInt(qut, 10) - 1).toString();
    } else {
      clone[index].wishlist_id = parseInt(qut, 10) + 1;
    }

    setData([...clone]);
  };

  const Addtocart = (id_Unique, attribute_combinations, que) => {
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
      quantity: que,
    };

    helpers.UrlReq(url, 'POST', requestObj).then((response) => {
      if (response != null) {
        if (response.status) {
          global.global_loader_reff.show_loader(0);
          helpers.ToastShow(response.message, 'success');
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

  //flatlist design
  const AllCategory = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => SubCategory(item.id, index)}>
        <GlobalInclude.GlobalTextBox
          text={item.name}
          style={{
            color:
              Check == index
                ? GlobalInclude.GlobalColor.ColorWhite
                : GlobalInclude.GlobalColor.ColorBlack,
          }}
          viewstyle={{
            borderRadius: scale(10),
            alignItems: 'center',
            justifyContent: 'center',
            height: scale(70),
            width: scale(100),
            backgroundColor:
              Check == index
                ? GlobalInclude.GlobalColor.ColorRed
                : GlobalInclude.GlobalColor.ColorWhite,
            shadowColor: '#000',
            marginHorizontal: scale(7),
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            borderRadius: scale(6),
            elevation: 5,
          }}
        />
      </TouchableOpacity>
    );
  };

  const TopDeals = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductDetail', {id_Unique: item.id_unique})
        }>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginHorizontal: scale(15),
            paddingHorizontal: scale(10),
            height: scale(130),
            backgroundColor: GlobalInclude.GlobalColor.ColorWhite,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            borderRadius: scale(6),
            elevation: 5,
            marginTop: scale(20),
          }}>
          <GlobalInclude.GlobalImageBox
            uri={true}
            source={item.image_name}
            style={{height: scale(70), width: scale(60), resizeMode: 'stretch'}}
            viewstyle={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />

          <View
            style={{
              flex: 2,
              width: '100%',
              marginLeft: scale(10),
              marginRight: scale(10),
              justifyContent: 'center',
            }}>
            {/* <GlobalInclude.GlobalTextBox
              text={'All Nutri'}
              style={{
                fontSize: scale(14),
                textAlign: 'left',
                color: GlobalInclude.GlobalColor.LightGray,
              }}
              viewstyle={{marginTop: scale(5)}}
            /> */}
            <GlobalInclude.GlobalTextBox
              text={item.title}
              style={{fontSize: scale(15), textAlign: 'left'}}
              numberOfLines={2}
            />
            <GlobalInclude.GlobalTextBox
              text={'Qut / Weight'}
              style={{
                fontSize: scale(14),
                textAlign: 'left',
                color: GlobalInclude.GlobalColor.LightGray,
              }}
              viewstyle={{marginTop: scale(5)}}
            />
            <GlobalInclude.GlobalTextBox
              text={item.other_info.quantity}
              style={{fontSize: scale(15), textAlign: 'left'}}
            />
            {/* <GlobalInclude.GlobalTextBox
              text={'FC 4650'}
              style={{fontSize: scale(15), textAlign: 'left'}}
              viewstyle={{marginTop: scale(10)}}
            /> */}
          </View>
          <View
            style={{
              flex: 1.5,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  if (item.wishlist_id > 0) {
                    updatePrice(1, index, item.wishlist_id);
                  }
                }}>
                <GlobalInclude.GlobalImageBox
                  source={GlobalInclude.GlobalAssets.Minus}
                  viewstyle={{
                    height: scale(30),
                    width: scale(30),
                    borderRadius: scale(30),
                    backgroundColor: GlobalInclude.GlobalColor.ColorRed,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
              </TouchableOpacity>
              <GlobalInclude.GlobalTextBox
                text={item.wishlist_id}
                style={{fontSize: scale(17)}}
                viewstyle={{
                  height: scale(30),
                  width: scale(30),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  updatePrice(2, index, item.wishlist_id);
                }}>
                <GlobalInclude.GlobalImageBox
                  source={GlobalInclude.GlobalAssets.Plus}
                  viewstyle={{
                    height: scale(30),
                    width: scale(30),
                    borderRadius: scale(30),
                    backgroundColor: GlobalInclude.GlobalColor.ColorRed,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{width: '80%'}}
              onPress={() =>
                Addtocart(
                  item.id_unique,
                  item.other_info.attribute_combinations[0],
                  item.wishlist_id,
                )
              }>
              <GlobalInclude.GlobalTextBox
                text={'ADD'}
                style={{
                  fontSize: scale(14),
                  color: GlobalInclude.GlobalColor.ColorWhite,
                }}
                viewstyle={{
                  height: scale(25),
                  backgroundColor: GlobalInclude.GlobalColor.ColorRed,
                  width: '80%',
                  marginHorizontal: '10%',
                  borderRadius: scale(15),
                  marginTop: scale(20),
                  justifyContent: 'center',
                }}
              />
            </TouchableOpacity>
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
            text={'Product'}
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

      <View style={{marginTop: scale(10)}}>
        <FlatList
          data={CategoryData}
          //  ItemSeparatorComponent={ItemSeparatorView}
          //Item Separator View
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={AllCategory}
          initialScrollIndex={CurrentIndex}
          contentContainerStyle={{padding: 10}}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <View>
        {UnableData == true ? (
          <View style={{width: '100%', marginTop: scale(170)}}>
            <GlobalInclude.GlobalTextBox
              text={'Product Not Available'}
              style={{fontSize: scale(17)}}
            />
          </View>
        ) : (
          <FlatList
            data={Data}
            showsHorizontalScrollIndicator={false}
            renderItem={TopDeals}
            contentContainerStyle={{paddingBottom: 70}}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    </View>
  );
};

export default Login;
