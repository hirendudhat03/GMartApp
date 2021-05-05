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
import {scale, width} from '../Theme/Scalling';
import Indicator from '../Component/Indicator';
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
  // const [ListItems] = useState(dummyArray);
  // const [Check, setCheck] = useState(0);

  // const category = (index) => {
  //   setCheck(index);
  // };
  // //flatlist design
  // const AllCategory = ({item, index}) => {
  //   return (
  //     <View style={{padding: scale(7)}}>
  //       <TouchableOpacity onPress={() => category(index)}>
  //         <GlobalInclude.GlobalTextBox
  //           text={'Skin care'}
  //           viewstyle={{
  //             width: scale(90),
  //             height: scale(40),
  //             borderRadius: scale(10),
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //             backgroundColor:
  //               Check == index
  //                 ? GlobalInclude.GlobalColor.ColorRed
  //                 : GlobalInclude.GlobalColor.ColorWhite,
  //           }}
  //         />
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  // const TopDeals = ({item}) => {
  //   return (
  //     <GlobalInclude.GlobalImageBox
  //       source={GlobalInclude.GlobalAssets.Olay}
  //       style={{height: scale(80), width: scale(80)}}
  //       viewstyle={{
  //         height: scale(100),
  //         width: scale(100),
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         borderRadius: scale(10),
  //         margin: scale(10),
  //         backgroundColor: GlobalInclude.GlobalColor.ColorWhite,
  //       }}
  //     />
  //   );
  // };

  // const TopCategory = ({item}) => {
  //   return (
  //     <View
  //       style={{
  //         backgroundColor: GlobalInclude.GlobalColor.ColorWhite,
  //         height: scale(120),
  //         width: scale(102),
  //         margin: scale(7),
  //         borderRadius: scale(7),
  //       }}>
  //       <GlobalInclude.GlobalImageBox
  //         source={GlobalInclude.GlobalAssets.Face}
  //         style={{height: scale(60), width: scale(60)}}
  //         viewstyle={{
  //           width: '100%',
  //           height: scale(90),
  //           alignItems: 'center',
  //           justifyContent: 'center',
  //         }}
  //       />

  //       <GlobalInclude.GlobalTextBox
  //         text={'Facial Care'}
  //         style={{
  //           fontSize: scale(13),
  //           color: GlobalInclude.GlobalColor.ColorDarkBlue,
  //         }}
  //       />
  //     </View>
  //   );
  // };
  const [Category, setCategory] = useState();
  const [Color2] = useState([
    '#FFD25D',
    '#95FEB9',
    '#95D2FF',
    '#D680FF',
    '#FFEE96',
    '#FFA9DE',
  ]);

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
          getCategoty();
          // global.global_loader_reff.show_loader(0);
        } else {
          global.global_loader_reff.show_loader(0);
        }
      } else {
        global.global_loader_reff.show_loader(0);
      }
    });
  };

  const getCategoty = () => {
    global.global_loader_reff.show_loader(1);

    let url = 'api/category';

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
          setCategory(response.data);

          global.global_loader_reff.show_loader(0);
        } else {
          global.global_loader_reff.show_loader(0);
        }
      } else {
        global.global_loader_reff.show_loader(0);
      }
    });
  };

  // useEffect(() => {
  //   getCategoty();
  // }, []);

  useEffect(() => {
    const listener = navigation.addListener('didFocus', () => getCategoty());

    getCategoty();

    return function cleanup() {
      listener.remove();
    };
  }, []);

  useLayoutEffect(() => {
    //console.log('USE LAYOUT EFFECT FUNCTION TRIGGERED');
    //CartProduct()
  });

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
            text="Categories"
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
      <View>
        <FlatList
          data={Category}
          //  ItemSeparatorComponent={ItemSeparatorView}
          //Item Separator View
          numColumns={3}
          renderItem={TopCategory}
          contentContainerStyle={{paddingBottom: scale(80)}}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      {/* <ScrollView>
        <View style={{marginTop: scale(10)}}>
          <FlatList
            data={ListItems}
            //  ItemSeparatorComponent={ItemSeparatorView}
            //Item Separator View
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={AllCategory}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <GlobalInclude.GlobalTextBox
          text={'Sort By Brand'}
          style={{
            fontSize: scale(13),
            marginTop: scale(20),
            textAlign: 'left',
            marginLeft: scale(20),
          }}
        />

        <View>
          <FlatList
            data={ListItems}
            //  ItemSeparatorComponent={ItemSeparatorView}
            //Item Separator View
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={TopDeals}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <GlobalInclude.GlobalTextBox
          text={'Product By category'}
          style={{
            fontSize: scale(13),
            marginTop: scale(20),
            textAlign: 'left',
            marginLeft: scale(20),
          }}
        />

        <View>
          <FlatList
            data={ListItems}
            //  ItemSeparatorComponent={ItemSeparatorView}
            //Item Separator View
            numColumns={3}
            renderItem={TopCategory}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default home;
