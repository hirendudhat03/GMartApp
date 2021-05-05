//import React
import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  LogBox,
  StatusBar,
} from 'react-native';
import GlobalInclude from '../Global/GlobalInclude/globalinclude';
import {scale, width} from '../Theme/Scalling';
import ViewPager from '@react-native-community/viewpager';
import Indicator from '../Component/Indicator';
import AsyncStorage from '@react-native-community/async-storage';
import helpers from '../Global/Helper/helper';

LogBox.ignoreAllLogs();
//variable
let viewPager = null;

//defalt function
const home = ({navigation}) => {
  const [CurrentPosition, setCurrentPosition] = useState(0);
  const [Color] = useState(['#2F9BFF', '#FFB82F', '#60FF38', '#FF6E2F']);
  const [Color2] = useState([
    '#FFD25D',
    '#95FEB9',
    '#95D2FF',
    '#D680FF',
    '#FFEE96',
    '#FFA9DE',
  ]);

  const [HomeSlider, setHomeSlider] = useState([]);
  const [SliderOffer, setSliderOffer] = useState([]);
  const [Category, setCategory] = useState();
  const [DealsProduct, setDealsProduct] = useState();

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
          for (var i = 0; i <= 20; i++) {
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
            } else if (response.data[i].key == 'home') {
              global.Home = response.data[i].value;
            } else if (response.data[i].key == 'category') {
              global.Category = response.data[i].value;
            } else if (response.data[i].key == 'bag') {
              global.Bag = response.data[i].value;
            } else if (response.data[i].key == 'favorites') {
              global.Favorites = response.data[i].value;
            } else if (response.data[i].key == 'setting') {
              global.Setting = response.data[i].value;
            } else if (response.data[i].key == 'my_account') {
              global.my_account = response.data[i].value;
            } else if (response.data[i].key == 'my_order') {
              global.my_order = response.data[i].value;
            } else if (response.data[i].key == 'offer') {
              global.offer = response.data[i].value;
            } else if (response.data[i].key == 'contect_us') {
              global.contect_us = response.data[i].value;
            } else if (response.data[i].key == 'help') {
              global.help = response.data[i].value;
            }
          }
          homeApi();
          // global.global_loader_reff.show_loader(0);
        } else {
          global.global_loader_reff.show_loader(0);
        }
      } else {
        global.global_loader_reff.show_loader(0);
      }
    });
  };

  const homeApi = () => {
    global.global_loader_reff.show_loader(1);

    let url = 'api/homepage';

    var IdUser;

    if (global.userid == null) {
      IdUser = global.deviceid;
    } else {
      IdUser = global.userid;
    }

    var id = global.languageid;
    var requestObj = {
      id_language: id,
      id_user: IdUser,
    };

    helpers.UrlReq(url, 'POST', requestObj).then((response) => {
      if (response.data != null) {
        if (response.status) {
          setHomeSlider(response.data.home_slider);
          setSliderOffer(response.data.slider_offer);
          setCategory(response.data.category);
          setDealsProduct(response.data.deals_product);

          // KeywordApi(id);
          global.global_loader_reff.show_loader(0);
        } else {
          global.global_loader_reff.show_loader(0);
        }
      } else {
        global.global_loader_reff.show_loader(0);
      }
    });
  };

  useEffect(() => {
    CheckLoginScreen();

    homeApi();
  }, []);

  // useEffect(() => {
  //   const listener = navigation.addListener('didFocus', () => homeApi());

  //   CheckLoginScreen();

  //   homeApi();

  //   return function cleanup() {
  //     listener.remove();
  //   };
  // }, []);

  // useLayoutEffect(() => {
  //   //console.log('USE LAYOUT EFFECT FUNCTION TRIGGERED');
  //   //CartProduct()
  // });

  const CheckLoginScreen = () => {
    AsyncStorage.setItem('Check_LoginScreen1', 'true');
  };
  //flatlist design
  const AllCategory = ({item, index}) => {
    return (
      <View style={{padding: scale(7)}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SubCategory', {
              id_Unique: item.id,
              CategoryItem: Category,
              index: index,
            })
          }>
          <GlobalInclude.GlobalImageBox
            uri={true}
            source={item.image}
            style={{height: scale(30), width: scale(30)}}
            viewstyle={{
              backgroundColor: Color[index % Color.length],
              height: scale(60),
              width: scale(60),
              borderRadius: scale(60),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
          <GlobalInclude.GlobalTextBox
            text={item.name}
            numberOfLines={2}
            viewstyle={{
              width: scale(60),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const TopDeals = ({item}) => {
    var finalprice = item.other_info.final_price[0];
    var prices = item.other_info.prices[0];
    var discount = item.other_info.discount[0];

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductDetail', {id_Unique: item.id_unique})
        }>
        <View
          style={{
            padding: scale(7),
            height: scale(250),
            width: scale(150),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: GlobalInclude.GlobalColor.Gray,
              borderRadius: scale(10),
            }}>
            <GlobalInclude.GlobalTextBox
              text={discount + '%'}
              style={{color: GlobalInclude.GlobalColor.ColorWhite}}
              viewstyle={{
                height: scale(22),
                width: scale(50),
                margin: scale(7),
                backgroundColor: GlobalInclude.GlobalColor.ColorRed,
                borderRadius: scale(20),
                color: GlobalInclude.GlobalColor.ColorWhite,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />

            <GlobalInclude.GlobalImageBox
              source={GlobalInclude.GlobalAssets.RoundImage}
              style={{
                height: scale(130),
                width: scale(130),
                marginTop: scale(-10),
              }}
              viewstyle={{
                height: scale(130),
                width: scale(130),
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
            <GlobalInclude.GlobalImageBox
              uri={true}
              source={item.image_name}
              style={{
                height: scale(80),
                width: scale(80),
                marginTop: scale(-10),
              }}
              viewstyle={{
                height: scale(130),
                width: scale(130),
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: scale(-140),
              }}
            />
          </View>
          <GlobalInclude.GlobalTextBox
            text={item.title}
            style={{
              color: GlobalInclude.GlobalColor.ColorDarkBlue,
              textAlign: 'left',
            }}
            viewstyle={{width: '100%', marginLeft: scale(10)}}
          />

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              marginLeft: scale(10),
            }}>
            <GlobalInclude.GlobalTextBox
              text={'$' + finalprice}
              style={{
                color: GlobalInclude.GlobalColor.ColorRed2,
                textAlign: 'left',
              }}
              viewstyle={{width: '100%', flex: 1}}
            />
            <GlobalInclude.GlobalTextBox
              text={'$' + prices}
              style={{
                color: GlobalInclude.GlobalColor.LightGray,
                textAlign: 'left',
                textDecorationLine: 'line-through',
              }}
              viewstyle={{width: '100%', flex: 1}}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const TopCategory = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('SubCategory', {
            id_Unique: item.id,
            CategoryItem: Category,
            index: index,
          })
        }>
        <View
          style={{
            backgroundColor: Color2[index % Color2.length],
            height: scale(150),
            width: scale(102),
            margin: scale(7),
            borderRadius: scale(7),
          }}>
          <GlobalInclude.GlobalImageBox
            uri={true}
            source={item.image}
            style={{height: scale(80), width: scale(80)}}
            viewstyle={{
              width: '100%',
              height: scale(110),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />

          <GlobalInclude.GlobalTextBox
            text={item.name}
            numberOfLines={2}
            style={{
              fontSize: scale(14),
              color: GlobalInclude.GlobalColor.ColorDarkBlue,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };
  //viewpager

  const onPageSelected = (position) => {
    setCurrentPosition(position);
  };

  const generateSlider = () => {
    let componentArr = [];
    HomeSlider.map((HomeSlider, index) => {
      const imageObject =
        typeof HomeSlider.image === 'string'
          ? {uri: HomeSlider.image}
          : HomeSlider.image;
      const imageComponentWithOverlay = (
        <View
          key={index}
          style={{
            flex: 1,
            borderRadius: scale(0),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={imageObject}
            style={{
              height: '100%',
              width: '100%',
              borderRadius: scale(0),
              alignSelf: 'center',
              resizeMode: 'cover',
              overflow: 'hidden',
            }}
          />
        </View>
      );
      componentArr.push(imageComponentWithOverlay);
    });
    return componentArr;
  };
  const generateSlider2 = () => {
    let componentArr = [];
    SliderOffer.map((HomeSlider, index) => {
      const imageObject =
        typeof HomeSlider.image === 'string'
          ? {uri: HomeSlider.image}
          : HomeSlider.image;
      const imageComponentWithOverlay = (
        <GlobalInclude.GlobalImageBox
          source={imageObject}
          style={{height: scale(120), width: '100%'}}
          viewstyle={{height: scale(120), width: '100%'}}
        />
      );
      componentArr.push(imageComponentWithOverlay);
    });
    return componentArr;
  };

  return (
    <View style={{flex: 1, marginBottom: scale(20)}}>
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
            text={global.g_mart}
            style={{
              color: GlobalInclude.GlobalColor.ColorWhite,
              fontSize: scale(20),
              textAlign: 'center',
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
          selectionColor={GlobalInclude.GlobalColor.ColorBlack}
        /> */}
      </View>

      {/* Design */}
      <ScrollView>
        <View style={{marginTop: scale(10)}}>
          <FlatList
            data={Category}
            //  ItemSeparatorComponent={ItemSeparatorView}
            //Item Separator View
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={AllCategory}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <View style={{marginTop: scale(10), height: scale(240)}}>
          <ViewPager
            style={{
              height: scale(220),
              flex: 1,
              borderRadius: scale(0),
            }}
            initialPage={CurrentPosition}
            transitionStyle={'curl'}
            orientation={'horizontal'}
            showPageIndicator={false}
            onPageSelected={(e) => {
              onPageSelected(e.nativeEvent.position);
            }}
            ref={viewPager}>
            {generateSlider()}
          </ViewPager>
          <Indicator
            itemCount={HomeSlider.length} //{sliderImage.length}
            currentIndex={CurrentPosition}
            //   indicatorContainerStyle={{height:scale(8),width:scale(8)}}
            indicatorActiveColor={'#EF0000'}
            indicatorInActiveColor={'#FFEBEB'}
            indicatorActiveWidth={scale(8)}
          />
        </View>

        <GlobalInclude.GlobalTextBox
          text={global.top_deals}
          style={{
            fontSize: scale(20),
            textAlign: 'left',
            marginLeft: scale(20),
          }}
        />
        <GlobalInclude.GlobalTextBox
          text={global.you_never_seen_it_before}
          style={{
            fontSize: scale(13),
            textAlign: 'left',
            marginLeft: scale(20),
            color: GlobalInclude.GlobalColor.LightGray,
          }}
        />

        <View>
          <FlatList
            data={DealsProduct}
            //  ItemSeparatorComponent={ItemSeparatorView}
            //Item Separator View
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={TopDeals}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <ViewPager
          style={{
            height: scale(120),
            marginTop: scale(7),
          }}
          initialPage={CurrentPosition}
          transitionStyle={'curl'}
          orientation={'horizontal'}
          showPageIndicator={false}
          ref={viewPager}>
          {generateSlider2()}
        </ViewPager>

        <GlobalInclude.GlobalTextBox
          text={global.shop_from_top_categories}
          style={{
            fontSize: scale(20),
            textAlign: 'left',
            marginTop: scale(20),
            marginLeft: scale(20),
            color: GlobalInclude.GlobalColor.ColorBlack,
          }}
        />
        <GlobalInclude.GlobalTextBox
          text={global.you_never_seen_it_before}
          style={{
            fontSize: scale(13),
            textAlign: 'left',
            marginLeft: scale(20),
            color: GlobalInclude.GlobalColor.LightGray,
          }}
        />

        <View>
          <FlatList
            data={Category}
            //  ItemSeparatorComponent={ItemSeparatorView}
            //Item Separator View
            numColumns={3}
            renderItem={TopCategory}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Category')}>
          <GlobalInclude.GlobalTextBox
            text={global.see_more}
            style={{
              fontSize: scale(15),
              color: GlobalInclude.GlobalColor.ColorWhite,
            }}
            viewstyle={{
              backgroundColor: GlobalInclude.GlobalColor.ColorRed,
              marginHorizontal: scale(20),
              height: scale(45),
              borderRadius: scale(30),
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: scale(30),
              marginBottom: scale(20),
            }}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default home;
