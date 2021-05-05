//import React
import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import GlobalInclude from '../Global/GlobalInclude/globalinclude';
import {scale} from '../Theme/Scalling';
import helpers from '../Global/Helper/helper';

const home = ({navigation}) => {
  const [Data, setData] = useState();
  const [OrderNo, setOrderNo] = useState();
  const [DateTime, setDateTime] = useState();
  const [Status, setStatus] = useState();
  const [ItemCount, setItemCount] = useState();
  const [Address, setAddress] = useState();
  const [TotalAmount, setTotalAmount] = useState();
  const [PaymentMode, setPaymentMode] = useState();
  const [Discount, setDiscount] = useState();
  const [Pormocode, setPormocode] = useState();

  const orderlist = () => {
    global.global_loader_reff.show_loader(1);

    let url = 'api/order/detail';

    var requestObj = {
      order_id: navigation.state.params.OrderId,
      id_language: global.languageid,
      id_user: global.userid,
      id_currency: global.currencyid,
    };

    console.log(requestObj);

    helpers.UrlReq(url, 'POST', requestObj).then((response) => {
      if (response.data != null) {
        if (response.status) {
          setData(response.data.info[0].product_info);
          setOrderNo(response.data.info[0].order_info.order_id);
          setDateTime(response.data.info[0].order_info.order_date_time);
          setStatus(response.data.info[0].order_info.order_status);
          setAddress(response.data.info[0].address_info);
          setTotalAmount(response.data.info[0].order_price.final_total);
          setPaymentMode(response.data.info[0].order_info.payment_mode);

          if (
            response.data.info[0].order_info.discount_value == null ||
            response.data.info[0].order_info.coupon_code == null
          ) {
            setDiscount('');
            setPormocode('');
          } else {
            setDiscount(response.data.info[0].order_info.discount_value);
            setPormocode(response.data.info[0].order_info.coupon_code);
          }

          console.log('response.data ==>', response.data);
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
  const TopDeals = ({item, index}) => {
    setItemCount(index);

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
                style={{textAlign: 'left', fontSize: scale(18)}}
                viewstyle={{flex: 1}}
              />
            </View>

            <GlobalInclude.GlobalTextBox
              text={item.category_name}
              style={{
                textAlign: 'left',
                fontSize: scale(14),
                color: GlobalInclude.GlobalColor.LightGray,
              }}
            />

            <View style={{flexDirection: 'row', marginTop: scale(10)}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <GlobalInclude.GlobalTextBox
                  text={'Color: '}
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
                  text={item.attributes[0].attribute_name}
                  style={{
                    textAlign: 'left',
                    fontSize: scale(14),
                    color: GlobalInclude.GlobalColor.LightGray,
                  }}
                />
                <GlobalInclude.GlobalTextBox
                  text={' : ' + item.attributes[0].attribute_value}
                  style={{textAlign: 'left', fontSize: scale(14)}}
                />
              </View>
            </View>
            <View style={{flex: 2, marginTop: scale(10)}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <GlobalInclude.GlobalTextBox
                    text={'quantity : '}
                    style={{
                      textAlign: 'left',
                      fontSize: scale(14),
                      color: GlobalInclude.GlobalColor.LightGray,
                    }}
                  />
                  <GlobalInclude.GlobalTextBox
                    text={item.quantity}
                    style={{textAlign: 'left', fontSize: scale(14)}}
                  />
                </View>

                <GlobalInclude.GlobalTextBox
                  text={item.price + '$'}
                  style={{
                    textAlign: 'right',
                    fontSize: scale(15),
                    marginRight: scale(20),
                  }}
                  viewstyle={{flex: 1}}
                />
              </View>
            </View>
          </View>
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
            text={'Order Details'}
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
            marginHorizontal: scale(15),
            marginTop: scale(15),
          }}>
          <GlobalInclude.GlobalTextBox
            text={'Order NO.' + OrderNo}
            style={{fontSize: scale(15), textAlign: 'left'}}
            viewstyle={{flex: 1}}
          />
          <GlobalInclude.GlobalTextBox
            text={DateTime}
            style={{
              fontSize: scale(12),
              textAlign: 'right',
              color: GlobalInclude.GlobalColor.LightGray,
            }}
            viewstyle={{flex: 1}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: scale(15),
            marginTop: scale(-17),
          }}>
          <View style={{flexDirection: 'row'}}>
            {/* <GlobalInclude.GlobalTextBox
              text={'Tracking number:  '}
              style={{
                fontSize: scale(15),
                textAlign: 'left',
                color: GlobalInclude.GlobalColor.LightGray,
              }}
            />
            <GlobalInclude.GlobalTextBox
              text={'IW34754555'}
              style={{
                fontSize: scale(15),
                textAlign: 'left',
              }}
            /> */}
          </View>
          <GlobalInclude.GlobalTextBox
            text={Status}
            style={{
              fontSize: scale(12),
              textAlign: 'right',
              color: GlobalInclude.GlobalColor.ColorGreen,
            }}
            viewstyle={{flex: 1}}
          />
        </View>

        <GlobalInclude.GlobalTextBox
          text={ItemCount + 1 + ' items'}
          style={{fontSize: scale(15), textAlign: 'left', marginTop: scale(20)}}
          viewstyle={{marginHorizontal: scale(20)}}
        />

        <View>
          <FlatList
            data={Data}
            showsHorizontalScrollIndicator={false}
            renderItem={TopDeals}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <GlobalInclude.GlobalTextBox
          text={'Order information'}
          style={{fontSize: scale(15), textAlign: 'left', marginTop: scale(10)}}
          viewstyle={{marginHorizontal: scale(20), marginTop: scale(20)}}
        />

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: scale(20),
            marginTop: scale(15),
          }}>
          <GlobalInclude.GlobalTextBox
            text={'Shipping Address:'}
            style={{
              fontSize: scale(15),
              textAlign: 'left',
              color: GlobalInclude.GlobalColor.LightGray,
            }}
            viewstyle={{flex: 1}}
          />
          <GlobalInclude.GlobalTextBox
            text={
              Address === 'undefined, undefined, undefined, undefined'
                ? null
                : Address
            }
            style={{fontSize: scale(15), textAlign: 'left', flexWrap: 'wrap'}}
            viewstyle={{flex: 1.5}}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: scale(20),
            marginTop: scale(15),
          }}>
          <GlobalInclude.GlobalTextBox
            text={'Payment method:'}
            style={{
              fontSize: scale(15),
              textAlign: 'left',
              color: GlobalInclude.GlobalColor.LightGray,
            }}
            viewstyle={{flex: 1}}
          />

          <View style={{flex: 1.5, flexDirection: 'row'}}>
            {/* <GlobalInclude.GlobalImageBox
              source={GlobalInclude.GlobalAssets.Card}
              style={{height: scale(32), width: scale(42)}}
              viewstyle={{flex: 1}}
            /> */}
            <GlobalInclude.GlobalTextBox
              text={PaymentMode}
              style={{fontSize: scale(15), textAlign: 'left', flexWrap: 'wrap'}}
              viewstyle={{flex: 3}}
            />
          </View>
        </View>

        {/* <View
          style={{
            flexDirection: 'row',
            marginHorizontal: scale(20),
            marginTop: scale(15),
          }}>
          <GlobalInclude.GlobalTextBox
            text={'Delivery method:'}
            style={{
              fontSize: scale(15),
              textAlign: 'left',
              color: GlobalInclude.GlobalColor.LightGray,
            }}
            viewstyle={{flex: 1}}
          />
          <GlobalInclude.GlobalTextBox
            text={'FedEx, 3 days, 15$'}
            style={{fontSize: scale(15), textAlign: 'left', flexWrap: 'wrap'}}
            viewstyle={{flex: 1.5}}
          />
        </View> */}

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: scale(20),
            marginTop: scale(15),
          }}>
          <GlobalInclude.GlobalTextBox
            text={'Discount:'}
            style={{
              fontSize: scale(15),
              textAlign: 'left',
              color: GlobalInclude.GlobalColor.LightGray,
            }}
            viewstyle={{flex: 1}}
          />
          <GlobalInclude.GlobalTextBox
            text={Discount == '' ? null : Discount + '%' + ', ' + Pormocode}
            style={{fontSize: scale(15), textAlign: 'left', flexWrap: 'wrap'}}
            viewstyle={{flex: 1.5}}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: scale(20),
            marginTop: scale(15),
          }}>
          <GlobalInclude.GlobalTextBox
            text={'Total Amount:'}
            style={{
              fontSize: scale(15),
              textAlign: 'left',
              color: GlobalInclude.GlobalColor.LightGray,
            }}
            viewstyle={{flex: 1}}
          />
          <GlobalInclude.GlobalTextBox
            text={TotalAmount + '$'}
            style={{fontSize: scale(15), textAlign: 'left', flexWrap: 'wrap'}}
            viewstyle={{flex: 1.5}}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: scale(30),
            marginBottom: scale(20),
          }}>
          <GlobalInclude.GlobalTextBox
            text={'Reorder'}
            style={{fontSize: scale(15)}}
            viewstyle={{
              flex: 1,
              marginHorizontal: scale(20),
              height: scale(40),
              borderWidth: scale(1),
              borderRadius: scale(35),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
          {/* <GlobalInclude.GlobalTextBox
            text={'Leave feedback'}
            style={{
              fontSize: scale(15),
              color: GlobalInclude.GlobalColor.ColorWhite,
            }}
            viewstyle={{
              flex: 1,
              marginHorizontal: scale(10),
              backgroundColor: GlobalInclude.GlobalColor.ColorRed,
              borderRadius: scale(35),
              height: scale(40),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          /> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default home;
