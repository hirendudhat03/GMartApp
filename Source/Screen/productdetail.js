import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Switch,
  Alert,
  Modal,
  TouchableOpacity,
} from 'react-native';
import GlobalInclude from '../Global/GlobalInclude/globalinclude';
import {scale} from '../Theme/Scalling';
import helpers from '../Global/Helper/helper';
import HTMLView from 'react-native-htmlview';
import DeviceInfo from 'react-native-device-info';

//variable
const dummyArray = [
  {id: '1', value: 'A'},
  {id: '2', value: 'B'},
  {id: '3', value: 'C'},
  {id: '4', value: 'D'},
  {id: '5', value: 'E'},
];

const Login = ({navigation}) => {
  const [Category_Name, setCategory_Name] = useState();
  const [Image_Info, setImage_Info] = useState();
  const [Prices, setPrices] = useState(0);
  const [Description, setDescription] = useState('');
  const [AttributeNameBrands, setAttributeNameBrands] = useState();
  const [AttributeNameItem, setAttributeNameItem] = useState();
  const [AttributeNameColor, setAttributeNameColor] = useState();
  const [AttributeColorItem, setAttributeColorItem] = useState();
  const [AttributeInfo, setAttributeInfo] = useState();
  const [Number, setNumber] = useState(1);
  const [ImageUrl, setImageUrl] = useState();
  const [SubTotal, setSubTotal] = useState();
  const [SizeAlert, setSizeAlert] = useState(false);
  const [SizeBorder, setSizeBorder] = useState();
  const [Id_Unique, setId_Unique] = useState(false);
  const [ColorId, setColorId] = useState('');
  const [SizeAttribute, setSizeAttribute] = useState('');
  const [Check, setCheck] = useState(0);
  const [WishListId, setWishListId] = useState();
  const [WishlistColor, setWishlistColor] = useState(
    GlobalInclude.GlobalAssets.BlankHart,
  );

  const category = (id, index) => {
    setCheck(index);
    setColorId(',' + id);

    console.log('setColorId =>>', id);
  };

  const sizealert = (visible) => {
    setSizeAlert(visible);
  };

  const AddWishlist = () => {
    global.global_loader_reff.show_loader(1);

    let url = 'api/wishlist/add';

    var IdUser;

    if (global.userid == null) {
      IdUser = global.deviceid;
    } else {
      IdUser = global.userid;
    }

    var requestObj = {
      id_language: global.languageid,
      id_user: IdUser,
      id_product: Id_Unique,
    };

    helpers.UrlReq(url, 'POST', requestObj).then((response) => {
      if (response != null) {
        if (response.status) {
          global.global_loader_reff.show_loader(0);
          helpers.ToastShow(response.message, 'success');

          setWishlistColor(GlobalInclude.GlobalAssets.FillHart);
          productdetail();
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

  const wishlist = () => {
    if (WishlistColor == GlobalInclude.GlobalAssets.FillHart) {
      RemoveWishlist();

      console.log('RemoveWishlist');
    } else {
      AddWishlist();
      console.log('ADDWishlist');
    }
  };

  const updateQut = (value) => {
    if (value == 1) {
      Number <= 1 ? setNumber(1) : setNumber(Number - 1);
    } else {
      setNumber(Number + 1);
    }
  };

  const productdetail = () => {
    global.global_loader_reff.show_loader(1);

    console.log('wishlist is =====> ', navigation.state.params.id_Wishlist);

    let url = 'api/product/detail';

    var requestObj = {
      id_language: global.languageid,
      id_unique: navigation.state.params.id_Unique,
      id_user: global.userid,
      // navigation.state.params.id_Unique,
    };

    helpers.UrlReq(url, 'POST', requestObj).then((response) => {
      if (response.data != null) {
        if (response.status) {
          setAttributeInfo(response.data.other_info.attribute_info);
          setCategory_Name(response.data.category_name);
          setImage_Info(response.data.other_info.image_info);
          setPrices(response.data.other_info.prices);
          setDescription(response.data.description);
          setSubTotal(response.data.other_info.final_price);
          setId_Unique(response.data.id_unique);
          setImageUrl(response.data.image_name);

          if (response.data.is_wishlist) {
            setWishlistColor(GlobalInclude.GlobalAssets.FillHart);
            setWishListId(response.data.wishlist_id);
          } else {
            setWishlistColor(GlobalInclude.GlobalAssets.BlankHart);
          }

          if (response.data.other_info.attribute_info[0] != null) {
            setAttributeNameBrands(
              response.data.other_info.attribute_info[0].attribute_name,
            );
            setAttributeNameItem(
              response.data.other_info.attribute_info[0].attribute_values,
            );
          } else {
            alert('Brands not available');
          }
          if (response.data.other_info.attribute_info[1] != null) {
            setAttributeNameColor(
              response.data.other_info.attribute_info[1].attribute_name,
            );
            setAttributeColorItem(
              response.data.other_info.attribute_info[1].attribute_values,
            );
          } else {
            // Alert.alert('color not available');
          }

          global.global_loader_reff.show_loader(0);
        } else {
          global.global_loader_reff.show_loader(0);
        }
      } else {
        global.global_loader_reff.show_loader(0);
        helpers.ToastShow(response.message, 'fail');
      }
    });
  };

  useEffect(() => {
    // let deviceId = DeviceInfo.getUniqueId();
    // console.log('deviceId 123 =>', deviceId);
    productdetail();
  }, []);

  const Addtocart = () => {
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
      id_unique: Id_Unique,
      id_unique_attribute_values: SizeAttribute + ColorId,
      id_currency: global.currencyid,
      quantity: Number,
    };
    // 5ee8afd1d5cda,5ee8b07b083f2
    helpers.UrlReq(url, 'POST', requestObj).then((response) => {
      if (response != null) {
        if (response.status) {
          if (response.message === 'Product added to cart successfully') {
            global.bagnum += 1;
            // console.log();
          } else {
          }
          global.global_loader_reff.show_loader(0);
          helpers.ToastShow(response.message, 'success');
        } else {
          global.global_loader_reff.show_loader(0);
          helpers.ToastShow('Select Size and Color', 'fail');

          // if (global.userid == null) {
          //   helpers.ToastShow('please login to continue', 'fail');
          // } else {
          //   helpers.ToastShow('select attrinbutes', 'fail');
          // }
        }
      } else {
        global.global_loader_reff.show_loader(0);

        helpers.ToastShow(response.message, 'fail');
      }
    });
  };
  const RemoveWishlist = () => {
    global.global_loader_reff.show_loader(1);

    let url = 'api/wishlist/remove';

    var requestObj = {
      id_language: global.languageid,
      id_wishlist: WishListId,
    };

    // 5ee8afd1d5cda,5ee8b07b083f2
    helpers.UrlReq(url, 'POST', requestObj).then((response) => {
      if (response != null) {
        if (response.status) {
          global.global_loader_reff.show_loader(0);
          helpers.ToastShow(response.message, 'success');
          setWishlistColor(GlobalInclude.GlobalAssets.BlankHart);
          productdetail();
        } else {
          global.global_loader_reff.show_loader(0);

          helpers.ToastShow(response.message, 'fail');
        }
      } else {
        global.global_loader_reff.show_loader(0);
        alert(response.message);
        helpers.ToastShow(response.message, 'fail');
      }
    });
  };

  const Imageset = (image) => {
    var uri = image;

    setImageUrl(uri);

    // console.log('ImageUrl = > ', ImageUrl);
  };

  const TopDeals = ({item}) => {
    return (
      <TouchableOpacity onPress={() => Imageset(item.image_name)}>
        <GlobalInclude.GlobalImageBox
          uri={true}
          source={item.image_name}
          style={{height: '100%', width: '100%', resizeMode: 'stretch'}}
          viewstyle={{
            height: scale(80),
            width: scale(60),
            alignItems: 'stretch',
            justifyContent: 'center',
            borderRadius: scale(10),
            margin: scale(5),
            backgroundColor: GlobalInclude.GlobalColor.ColorWhite,
          }}
        />
      </TouchableOpacity>
    );
  };
  const colorary = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => category(item.id_unique, index)}>
        <View
          style={{
            height: scale(30),
            width: scale(30),
            borderRadius: scale(30),
            margin: scale(3),
            borderWidth: scale(2),
            borderColor:
              Check == index
                ? GlobalInclude.GlobalColor.ColorBlack
                : item.attribute_value,
            backgroundColor: item.attribute_value,
          }}></View>
      </TouchableOpacity>
    );
  };
  const SizeAttribute1 = (id, visible, index) => {
    setSizeAttribute(id);
    setSizeAlert(visible);
    setSizeBorder(index);

    console.log('setSizeAttribute =>>', visible);
  };

  const ItemSize = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => SizeAttribute1(item.id_unique, false, index)}>
        <View
          style={{
            height: scale(40),
            width: scale(80),
            marginRight: scale(10),
            borderWidth: scale(1),
            borderRadius: scale(10),
            alignItems: 'center',
            justifyContent: 'center',
            borderColor:
              SizeBorder == index
                ? GlobalInclude.GlobalColor.ColorRed
                : GlobalInclude.GlobalColor.ColorBlack,
            marginTop: scale(10),
          }}>
          <GlobalInclude.GlobalTextBox
            text={item.attribute_value}
            style={{fontSize: scale(17)}}
          />
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
            text={'Clothing'}
            style={{
              fontSize: scale(20),
              color: GlobalInclude.GlobalColor.ColorWhite,
              textAlign: 'center',
            }}
            viewstyle={{justifyContent: 'center', height: scale(40)}}
          />
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={() => wishlist()}>
              <GlobalInclude.GlobalImageBox
                source={WishlistColor}
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
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Design */}
      <ScrollView>
        <View style={{marginHorizontal: scale(20)}}>
          <GlobalInclude.GlobalTextBox
            text={Category_Name}
            style={{textAlign: 'left', fontSize: scale(15), fontWeight: 'bold'}}
            viewstyle={{marginTop: scale(20)}}
          />
          <GlobalInclude.GlobalImageBox
            uri={true}
            source={ImageUrl}
            style={{height: '100%', width: '100%', resizeMode: 'stretch'}}
            viewstyle={{
              height: scale(200),
              width: '100%',
              alignItems: 'stretch',
              marginTop: scale(20),
            }}
          />
          {/* <GlobalInclude.GlobalImageBox
            uri={true}
            source={ImageUrl}
            style={{height: scale(200)}}
            viewstyle={{
              height: scale(200),
              width: '100%',
              marginTop: scale(20),
              alignItems: 'center',
            }}
          /> */}

          <View>
            <FlatList
              data={Image_Info}
              //  ItemSeparatorComponent={ItemSeparatorView}
              //Item Separator View
              horizontal
              style={{marginTop: scale(15)}}
              showsHorizontalScrollIndicator={false}
              renderItem={TopDeals}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <GlobalInclude.GlobalTextBox
            text={'$' + Prices}
            style={{textAlign: 'left', fontSize: scale(20)}}
            viewstyle={{marginTop: scale(20)}}
          />

          <GlobalInclude.GlobalTextBox
            text={'Description'}
            style={{
              textAlign: 'left',
              fontSize: scale(15),
              color: GlobalInclude.GlobalColor.LightGray,
              fontWeight: 'bold',
            }}
            viewstyle={{marginTop: scale(20)}}
          />

          <View style={{marginTop: scale(10)}}>
            <HTMLView
              value={Description}
              ignoredTags={['br']}
              textComponentProps={{
                style: {
                  fontSize: scale(15),
                  color: GlobalInclude.GlobalColor.ColorBlack,
                },
              }}
            />
          </View>

          <View
            style={{
              marginTop: scale(20),
            }}>
            <GlobalInclude.GlobalTextBox
              text={'Qut:'}
              style={{
                textAlign: 'left',
                fontSize: scale(15),
                color: GlobalInclude.GlobalColor.LightGray,
                fontWeight: 'bold',
              }}
              viewstyle={{flex: 1}}
            />
            <View style={{flex: 1, flexDirection: 'row', marginTop: scale(10)}}>
              <TouchableOpacity onPress={() => updateQut(1)}>
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
                text={Number}
                style={{fontSize: scale(17)}}
                viewstyle={{
                  height: scale(40),
                  width: scale(40),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
              <TouchableOpacity onPress={() => updateQut(2)}>
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

            <View style={{flex: 1}}>
              <GlobalInclude.GlobalTextBox
                text={AttributeNameBrands}
                style={{
                  textAlign: 'left',
                  fontSize: scale(15),
                  color: GlobalInclude.GlobalColor.LightGray,
                  fontWeight: 'bold',
                }}
                viewstyle={{flex: 1, marginTop: scale(20)}}
              />
              <FlatList
                data={AttributeNameItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={ItemSize}
                keyExtractor={(item, index) => index.toString()}
              />

              {/* <TouchableOpacity onPress={() => sizealert(true)}>
                <View
                  style={{
                    height: scale(40),
                    width: scale(120),
                    borderWidth: scale(1),
                    borderRadius: scale(40),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: GlobalInclude.GlobalColor.ColorBlack,
                    marginTop: scale(10),
                  }}>
                  <GlobalInclude.GlobalTextBox
                    text={AttributeNameBrands}
                    style={{fontSize: scale(15), textAlign: 'center'}}
                    viewstyle={{
                      flex: 2,
                    }}
                  />
                  <GlobalInclude.GlobalImageBox
                    source={GlobalInclude.GlobalAssets.BottomArrow}
                    style={{height: scale(20), width: scale(20)}}
                    viewstyle={{flex: 1}}
                  />
                </View>
              </TouchableOpacity> */}
            </View>
          </View>

          <GlobalInclude.GlobalTextBox
            text={AttributeNameColor}
            style={{
              textAlign: 'left',
              fontSize: scale(15),
              color: GlobalInclude.GlobalColor.LightGray,
              fontWeight: 'bold',
            }}
            viewstyle={{flex: 1, marginTop: scale(15)}}
          />

          <FlatList
            data={AttributeColorItem}
            horizontal
            style={{marginTop: scale(15)}}
            showsHorizontalScrollIndicator={false}
            renderItem={colorary}
            keyExtractor={(item, index) => index.toString()}
          />

          <View style={{flexDirection: 'row'}}>
            <GlobalInclude.GlobalTextBox
              text={'Sub Total'}
              style={{
                textAlign: 'left',
                fontSize: scale(15),
                color: GlobalInclude.GlobalColor.LightGray,
                fontWeight: 'bold',
              }}
              viewstyle={{
                flex: 1,
                marginTop: scale(10),
              }}
            />

            <GlobalInclude.GlobalTextBox
              text={SubTotal + '$'}
              style={{
                textAlign: 'right',
                fontSize: scale(15),
                color: GlobalInclude.GlobalColor.ColorBlack,
              }}
              viewstyle={{
                flex: 1,
                marginTop: scale(10),
              }}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <GlobalInclude.GlobalTextBox
              text={'Total'}
              style={{
                textAlign: 'left',
                fontSize: scale(15),
                color: GlobalInclude.GlobalColor.LightGray,
                fontWeight: 'bold',
              }}
              viewstyle={{
                flex: 1,
                marginTop: scale(10),
              }}
            />

            <GlobalInclude.GlobalTextBox
              text={Number * SubTotal + '$'}
              style={{
                textAlign: 'right',
                fontSize: scale(15),
                color: GlobalInclude.GlobalColor.ColorBlack,
              }}
              viewstyle={{
                flex: 1,
                marginTop: scale(10),
              }}
            />
          </View>

          <TouchableOpacity onPress={() => Addtocart()}>
            {/* onPress={() => navigation.navigate('Success')}> */}
            <GlobalInclude.GlobalTextBox
              text={'ADD TO CART'}
              style={{
                fontSize: scale(15),
                color: GlobalInclude.GlobalColor.ColorWhite,
              }}
              viewstyle={{
                backgroundColor: GlobalInclude.GlobalColor.ColorRed,
                height: scale(45),
                borderRadius: scale(30),
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: scale(15),
                marginTop: scale(15),
              }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Model */}
      {/* <Modal visible={SizeAlert} transparent={true} animationType={'slide'}>
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
            <FlatList
              data={AttributeNameItem}
              style={{marginTop: scale(15)}}
              ItemSeparatorComponent={ItemSizeline}
              showsHorizontalScrollIndicator={false}
              renderItem={ItemSize}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </Modal> */}
    </View>
  );
};

export default Login;
