//import React
import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import GlobalInclude from '../Global/GlobalInclude/globalinclude';
import {scale} from '../Theme/Scalling';
import helpers from '../Global/Helper/helper';

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
  const [Delivered, setDelivered] = useState('');
  const [Processing, setProcessing] = useState('');
  const [Cencelled, setCencelled] = useState('');
  const [Delivered1, setDelivered1] = useState('');
  const [Processing1, setProcessing1] = useState('');
  const [Cencelled1, setCencelled1] = useState('');
  const [DeliveredOrder, setDeliveredOrder] = useState('');
  const [ProcessingOrder, setProcessingOrder] = useState('');
  const [CencelledOrder, setCencelledOrder] = useState('');
  const [DeliveredOrderData, setDeliveredOrderData] = useState(false);
  const [ProcessingOrderData, setProcessingOrderData] = useState(true);
  const [CencelledOrderData, setCencelledOrderData] = useState(false);

  const topclick = (item) => {
    if (item == 'Delivered') {
      setDelivered(GlobalInclude.GlobalColor.ColorRed);
      setProcessing(GlobalInclude.GlobalColor.ColorWhite);
      setCencelled(GlobalInclude.GlobalColor.ColorWhite);
      setDelivered1(GlobalInclude.GlobalColor.ColorWhite);
      setProcessing1(GlobalInclude.GlobalColor.ColorBlack);
      setCencelled1(GlobalInclude.GlobalColor.ColorBlack);
      setDeliveredOrderData(true);
      setProcessingOrderData(false);
      setCencelledOrderData(false);
    } else if (item == 'Processing') {
      setDelivered(GlobalInclude.GlobalColor.ColorWhite);
      setProcessing(GlobalInclude.GlobalColor.ColorRed);
      setCencelled(GlobalInclude.GlobalColor.ColorWhite);
      setDelivered1(GlobalInclude.GlobalColor.ColorBlack);
      setProcessing1(GlobalInclude.GlobalColor.ColorWhite);
      setCencelled1(GlobalInclude.GlobalColor.ColorBlack);
      setDeliveredOrderData(false);
      setProcessingOrderData(true);
      setCencelledOrderData(false);
    } else if (item == 'Cencelled') {
      setDelivered(GlobalInclude.GlobalColor.ColorWhite);
      setProcessing(GlobalInclude.GlobalColor.ColorWhite);
      setCencelled(GlobalInclude.GlobalColor.ColorRed);
      setDelivered1(GlobalInclude.GlobalColor.ColorBlack);
      setProcessing1(GlobalInclude.GlobalColor.ColorBlack);
      setCencelled1(GlobalInclude.GlobalColor.ColorWhite);
      setDeliveredOrderData(false);
      setProcessingOrderData(false);
      setCencelledOrderData(true);
    } else {
      alert('else');
    }
  };

  const orderlist = () => {
    topclick('Processing');
    global.global_loader_reff.show_loader(1);

    let url = 'api/order/get';

    var requestObj = {
      limit: '100',
      start_from: '0',
      id_language: global.languageid,
      id_user: global.userid,
      id_currency: global.currencyid,
    };

    helpers.UrlReq(url, 'POST', requestObj).then((response) => {
      if (response.data != null) {
        if (response.status) {
          // console.log(response.data[0].order_info.order_status);

          var i = 0;

          var pendingarry = [];
          var deliveredarry = [];
          var cancelledarry = [];

          // for (i = 0; i < 5; i++) {
          //   if (response.data[i].order_info.order_status === 'Pending') {
          //     pendingarry.push(response.data[i]);
          //   } else if (
          //     response.data[i].order_info.order_status === 'Delivered'
          //   ) {
          //     deliveredarry.push(response.data[i]);
          //   } else if (
          //     response.data[i].order_info.order_status === 'Cancelled'
          //   ) {
          //     cancelledarry.push(response.data[i]);
          //   } else {
          //     alert('else part run');
          //   }
          // }
          if (response.data[0].order_info.order_status === 'Pending') {
            pendingarry.push(response.data[i]);
          }

          if (pendingarry != '') {
            setProcessingOrder(pendingarry);
          } else {
            alert('pendingarry empty');
          }
          if (deliveredarry != '') {
            setDeliveredOrder(cancelledarry);
          } else {
            alert('deliveredarry empty');
          }
          if (cancelledarry != '') {
            setCencelledOrder(deliveredarry);
          } else {
            alert('cancelledarry empty');
          }
          // setProcessingOrder(pendingarry);
          // setCencelledOrder(deliveredarry);
          // setDeliveredOrder(cancelledarry);
          // console.log('pendingarry ==>', pendingarry);
          // console.log('deliveredarry ==>', deliveredarry);
          // console.log('cancelledarry ==>', cancelledarry);

          // setData(response.data);

          // for (var i = 0; i <= response.length; i++) {
          //   response.data[i].order_info;
          // }

          global.global_loader_reff.show_loader(0);
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

  useEffect(() => {
    orderlist();
  }, []);
  //flatlist design

  const TopDeals = ({item, index}) => {
    return (
      <View
        style={{
          marginHorizontal: scale(15),
          backgroundColor: GlobalInclude.GlobalColor.ColorWhite,
          borderRadius: scale(7),
          paddingVertical: scale(7),
          marginTop: scale(15),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,

          elevation: 7,
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: scale(15),
            marginTop: scale(5),
          }}>
          <GlobalInclude.GlobalTextBox
            text={'Order NO.' + item.order_info.order_id}
            style={{fontSize: scale(15), textAlign: 'left'}}
            viewstyle={{flex: 1}}
          />
          <GlobalInclude.GlobalTextBox
            text={item.order_info.order_date_time}
            style={{
              fontSize: scale(12),
              textAlign: 'right',
              color: GlobalInclude.GlobalColor.LightGray,
            }}
            viewstyle={{flex: 1}}
          />
        </View>
        {/* <View style={{flexDirection: 'row', marginHorizontal: scale(15)}}>
          <GlobalInclude.GlobalTextBox
            text={'Tracking number:  '}
            style={{
              fontSize: scale(15),
              textAlign: 'left',
              marginTop: scale(15),
              color: GlobalInclude.GlobalColor.LightGray,
            }}
          />
          <GlobalInclude.GlobalTextBox
            text={'IW34754555'}
            style={{
              fontSize: scale(15),
              textAlign: 'left',
              marginTop: scale(15),
            }}
          />
        </View> */}

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: scale(15),
            marginTop: scale(10),
          }}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <GlobalInclude.GlobalTextBox
              text={'Quantity:  '}
              style={{
                fontSize: scale(15),
                textAlign: 'left',
                marginTop: scale(5),
                color: GlobalInclude.GlobalColor.LightGray,
              }}
            />
            <GlobalInclude.GlobalTextBox
              text={
                item.product_info == null ? '' : item.product_info[0].quantity
              }
              style={{
                fontSize: scale(15),
                textAlign: 'left',
                marginTop: scale(5),
              }}
            />
          </View>
          <View style={{flexDirection: 'row', flex: 1}}>
            <GlobalInclude.GlobalTextBox
              text={'Total Amount:  '}
              style={{
                fontSize: scale(15),
                textAlign: 'left',
                marginTop: scale(5),
                color: GlobalInclude.GlobalColor.LightGray,
              }}
            />
            <GlobalInclude.GlobalTextBox
              text={item.order_price.final_total + '$'}
              style={{
                fontSize: scale(15),
                textAlign: 'left',
                marginTop: scale(5),
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: scale(15),
            marginHorizontal: scale(15),
            marginBottom: scale(10),
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('OrderDetail', {
                OrderId: item.order_info.order_id,
              })
            }>
            <GlobalInclude.GlobalTextBox
              text={'Details'}
              style={{fontSize: scale(17), textAlign: 'left'}}
              viewstyle={{
                flex: 1,
                height: scale(40),
                width: scale(120),
                borderWidth: scale(1),
                borderRadius: scale(30),
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          </TouchableOpacity>
          <GlobalInclude.GlobalTextBox
            text={item.order_info.order_status}
            style={{
              fontSize: scale(15),
              textAlign: 'right',
              color: GlobalInclude.GlobalColor.ColorGreen,
            }}
            viewstyle={{flex: 1, height: scale(40), justifyContent: 'center'}}
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
            text={'My Orders'}
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
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: scale(10),
            marginTop: scale(15),
          }}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => topclick('Delivered')}>
            <GlobalInclude.GlobalTextBox
              text={'Delivered'}
              style={{
                fontSize: scale(13),
                color: Delivered1,
              }}
              viewstyle={{
                borderRadius: scale(20),
                backgroundColor: Delivered,
                height: scale(35),
                marginHorizontal: scale(10),
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => topclick('Processing')}>
            <GlobalInclude.GlobalTextBox
              text={'Processing'}
              style={{
                fontSize: scale(13),
                color: Processing1,
              }}
              viewstyle={{
                flex: 1,
                borderRadius: scale(20),
                backgroundColor: Processing,

                height: scale(35),
                marginHorizontal: scale(10),
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => topclick('Cencelled')}>
            <GlobalInclude.GlobalTextBox
              text={'Cencelled'}
              style={{
                fontSize: scale(13),
                color: Cencelled1,
              }}
              viewstyle={{
                flex: 1,
                borderRadius: scale(20),
                backgroundColor: Cencelled,

                height: scale(35),
                marginHorizontal: scale(10),
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          </TouchableOpacity>
        </View>

        <View>
          {ProcessingOrderData == true ? (
            <FlatList
              data={ProcessingOrder}
              showsHorizontalScrollIndicator={false}
              renderItem={TopDeals}
              contentContainerStyle={{paddingBottom: 20}}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : null}
          {CencelledOrderData == true ? (
            <FlatList
              data={CencelledOrder}
              showsHorizontalScrollIndicator={false}
              renderItem={TopDeals}
              contentContainerStyle={{paddingBottom: 20}}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : null}
          {DeliveredOrderData == true ? (
            <FlatList
              data={DeliveredOrder}
              showsHorizontalScrollIndicator={false}
              renderItem={TopDeals}
              contentContainerStyle={{paddingBottom: 20}}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default home;
