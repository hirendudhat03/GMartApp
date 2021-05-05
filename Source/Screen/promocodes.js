//import React
import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Modal,
  TouchableOpacity,
} from 'react-native';
import GlobalInclude from '../Global/GlobalInclude/globalinclude';
import {scale} from '../Theme/Scalling';
import helpers from '../Global/Helper/helper';

const dummyArray = [
  {id: '1', value: 'A'},
  {id: '2', value: 'B'},
  {id: '3', value: 'B'},
  {id: '4', value: 'B'},
];

const home = ({navigation}) => {
  const [ListItems] = useState(dummyArray);
  const [Data, setData] = useState();

  

  useEffect(() => {
    global.global_loader_reff.show_loader(1);

    let url = 'api/coupon';
 
    var requestObj = {
      id_language: global.languageid,
    };
 
    helpers.UrlReq(url, 'POST', requestObj).then((response) => {
      if (response.data != null) {
        if (response.status) {
 
         setData(response.data);
         
          global.global_loader_reff.show_loader(0);
        } else {
          
          global.global_loader_reff.show_loader(0);
        }
      } else {
        
        global.global_loader_reff.show_loader(0);
      }
    });
    
  },[]);

  const AllCategory = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: scale(100),
          borderRadius: scale(7),
          marginTop: scale(20),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,

          elevation: 6,
          backgroundColor: GlobalInclude.GlobalColor.ColorWhite,
        }}>
        <GlobalInclude.GlobalImageBox
        uri={true}
          source={item.image}
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

        <View
          style={{flex: 2, marginLeft: scale(15), marginVertical: scale(10)}}>
          <GlobalInclude.GlobalTextBox
            text={item.name}
            style={{textAlign: 'left', fontSize: scale(17), height: '100%'}}
            viewstyle={{flex: 1, justifyContent: 'center'}}
          />
          <GlobalInclude.GlobalTextBox
            text={item.coupon_code}
            style={{
              textAlign: 'left',
              fontSize: scale(15),
              color: GlobalInclude.GlobalColor.ColorRed,
            }}
            viewstyle={{flex: 1, justifyContent: 'center'}}
          />
          <GlobalInclude.GlobalTextBox
            text={item.expire_date}
            style={{
              textAlign: 'left',
              fontSize: scale(14),
              color: GlobalInclude.GlobalColor.LightGray,
            }}
            viewstyle={{flex: 1, justifyContent: 'center'}}
          />
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
            text={'Promocodes'}
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

      <ScrollView>
        <View style={{marginHorizontal: scale(15)}}>
          <GlobalInclude.GlobalTextBox
            text={'Your Promocodes'}
            style={{textAlign: 'left', fontSize: scale(15)}}
            viewstyle={{marginTop: scale(20)}}
          />
          <View style={{marginTop: scale(10)}}>
            <FlatList
              data={Data}
              renderItem={AllCategory}
              contentContainerStyle={{paddingBottom: scale(20),paddingHorizontal:scale(5)}}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default home;