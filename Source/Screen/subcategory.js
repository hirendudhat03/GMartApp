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
  var AllData = navigation.state.params.CategoryItem;
  const [ListItems] = useState(dummyArray);

  const [Data, setData] = useState();
  const [CategoryData, setCategoryData] = useState(AllData);
  const [Check, setCheck] = useState();
  const [CurrentIndex, setCurrentIndex] = useState(
    navigation.state.params.index,
  );
  const [UnableData, setUnableData] = useState(false);

  //flatlist design

  const SubCategory = (id, index) => {
    global.global_loader_reff.show_loader(1);

    let url = 'api/category/sub_category';

    var requestObj = {
      id_language: '1',
      limit: '0',
      parent_id: id,
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
        // alert(response.message);
        setUnableData(true);
        setCheck(index);
      }
    });
  };

  useEffect(() => {
    SubCategory(
      navigation.state.params.id_Unique,
      navigation.state.params.index,
    );
  }, []);

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
            paddingHorizontal: scale(7),
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
          navigation.navigate('Product', {
            id_Unique: item.id,
            CategoryItem: Data,
            index: index,
          })
        }>
        <View
          style={{
            flexDirection: 'row',
            height: scale(70),
            backgroundColor: GlobalInclude.GlobalColor.ColorWhite,
            shadowColor: '#000',
            marginHorizontal: scale(20),
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
            source={item.image}
            style={{height: scale(50), width: scale(50)}}
            viewstyle={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: scale(20),
            }}
          />
          <GlobalInclude.GlobalTextBox
            text={item.name}
            style={{fontSize: scale(15), textAlign: 'left'}}
            viewstyle={{
              flex: 6,
              justifyContent: 'center',
              marginLeft: scale(40),
            }}
          />
          <GlobalInclude.GlobalImageBox
            source={GlobalInclude.GlobalAssets.RightArrow2}
            style={{height: scale(15), width: scale(10)}}
            viewstyle={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      {/* Header */}

      <StatusBar
        backgroundColor="transparent"
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
            text={'Sub Category'}
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
              text={'Category Not Available'}
              style={{fontSize: scale(17)}}
            />
          </View>
        ) : (
          <FlatList
            data={Data}
            showsHorizontalScrollIndicator={false}
            renderItem={TopDeals}
            contentContainerStyle={{paddingBottom: 20}}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    </View>
  );
};

export default Login;
