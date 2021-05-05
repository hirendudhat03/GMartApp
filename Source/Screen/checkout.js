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
  Modal,
  TouchableOpacity,
} from 'react-native';
import GlobalInclude from '../Global/GlobalInclude/globalinclude';
import {scale} from '../Theme/Scalling';
import helpers from '../Global/Helper/helper';

const Login = ({navigation}) => {
  const [Line1, setLine1] = useState(navigation.state.params.line1);
  const [Line2, setLine2] = useState(navigation.state.params.line2);
  const [State, setState] = useState(navigation.state.params.state);
  const [City, setCity] = useState(navigation.state.params.city);
  const [Promocode, setPromocode] = useState('');
  // const isFocused = useIsFocused();

  useEffect(() => {
    setPromocode(navigation.state.params.Promocode);
    console.log('promocode ===> ', Promocode);
  }, []);

  const checkout = () => {
    global.global_loader_reff.show_loader(1);

    let url = 'api/order/add';

    var requestObj = {
      id_address: Line1 + ', ' + Line2 + ', ' + City + ', ' + State,
      id_language: global.languageid,
      id_user: global.userid,
      id_currency: global.currencyid,
      payment_mode: '3',
      payment_info: '',
      coupon_code: Promocode,
    };

    helpers.UrlReq(url, 'POST', requestObj).then((response) => {
      if (response != null) {
        if (response.status) {
          helpers.ToastShow(response.message, 'success');
          navigation.navigate('Success');
          global.global_loader_reff.show_loader(0);
        } else {
          global.global_loader_reff.show_loader(0);
          if (global.userid == null) {
            helpers.ToastShow('Login Your Device', 'fail');
          } else {
            helpers.ToastShow(response.message, 'fail');
          }
        }
      } else {
        global.global_loader_reff.show_loader(0);
        helpers.ToastShow(response.message, 'fail');
      }
    });
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
            text={'Checkout'}
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
        <GlobalInclude.GlobalTextBox
          text={'Personal Information'}
          style={{textAlign: 'left', fontSize: scale(15)}}
          viewstyle={{marginHorizontal: scale(20), marginTop: scale(30)}}
        />

        <View
          style={{
            height: scale(100),
            marginHorizontal: scale(20),
            backgroundColor: GlobalInclude.GlobalColor.ColorWhite,
            borderRadius: scale(5),
            marginTop: scale(20),
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}>
          <View style={{flexDirection: 'row'}}>
            <GlobalInclude.GlobalTextBox
              text={global.name}
              style={{textAlign: 'left', fontSize: scale(14)}}
              viewstyle={{
                flex: 1,
                marginHorizontal: scale(20),
                marginTop: scale(10),
              }}
            />
            <TouchableOpacity
              onPress={() =>
                navigation.replace('ShippingAddress', {status: 1})
              }>
              <GlobalInclude.GlobalTextBox
                text={'Select'}
                style={{
                  textAlign: 'right',
                  fontSize: scale(14),
                  color: GlobalInclude.GlobalColor.ColorRed,
                }}
                viewstyle={{
                  flex: 1,
                  marginHorizontal: scale(20),
                  marginTop: scale(10),
                }}
              />
            </TouchableOpacity>
          </View>

          <GlobalInclude.GlobalTextBox
            text={Line1}
            style={{
              textAlign: 'left',
              fontSize: scale(14),
            }}
            viewstyle={{
              marginHorizontal: scale(20),
              marginTop: scale(10),
            }}
          />
          <GlobalInclude.GlobalTextBox
            text={Line2}
            style={{
              textAlign: 'left',
              fontSize: scale(14),
            }}
            viewstyle={{
              marginHorizontal: scale(20),
            }}
          />
          <GlobalInclude.GlobalTextBox
            text={City == null ? '' : City + ', ' + State}
            style={{
              textAlign: 'left',
              fontSize: scale(14),
            }}
            viewstyle={{
              marginHorizontal: scale(20),
            }}
          />
        </View>

        {/* <View style={{flexDirection: 'row'}}>
          <GlobalInclude.GlobalTextBox
            text={'Payment'}
            style={{textAlign: 'left', fontSize: scale(15)}}
            viewstyle={{
              flex: 1,
              marginHorizontal: scale(20),
              marginTop: scale(50),
            }}
          />
          <TouchableOpacity onPress={() => Filter()}>
            <GlobalInclude.GlobalTextBox
              text={'Change'}
              style={{
                textAlign: 'right',
                fontSize: scale(15),
                marginRight: scale(20),
                color: GlobalInclude.GlobalColor.ColorRed,
              }}
              viewstyle={{
                flex: 1,
                marginHorizontal: scale(20),
                marginTop: scale(50),
              }}
            />
          </TouchableOpacity>
        </View> */}

        {/* <View
          style={{
            flexDirection: 'row',
            marginHorizontal: scale(20),
            marginTop: scale(20),
          }}>
          <GlobalInclude.GlobalImageBox
            source={GlobalInclude.GlobalAssets.Card}
            style={{height: scale(32), width: scale(42)}}
            viewstyle={{}}
          />
          <GlobalInclude.GlobalTextBox
            text={'**** **** **** 3947'}
            style={{fontSize: scale(15), textAlign: 'left', flexWrap: 'wrap'}}
            viewstyle={{marginLeft: scale(15)}}
          />
        </View> */}

        <GlobalInclude.GlobalTextBox
          text={'Delivery method'}
          style={{textAlign: 'left', fontSize: scale(15)}}
          viewstyle={{marginHorizontal: scale(20), marginTop: scale(30)}}
        />

        <View
          style={{
            marginHorizontal: scale(10),
            flexDirection: 'row',
            marginTop: scale(20),
          }}>
          <View
            style={{
              marginHorizontal: scale(10),
              flex: 1,
              backgroundColor: GlobalInclude.GlobalColor.ColorWhite,
              width: '100%',
              height: scale(80),
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: scale(7),
            }}>
            <GlobalInclude.GlobalImageBox
              source={GlobalInclude.GlobalAssets.FedX}
              style={{height: scale(50), width: scale(100)}}
            />
            <GlobalInclude.GlobalTextBox text={'2-3 days'} />
          </View>
          <View
            style={{
              marginHorizontal: scale(10),
              flex: 1,
              backgroundColor: GlobalInclude.GlobalColor.ColorWhite,
              width: '100%',
              height: scale(80),
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: scale(7),
            }}>
            <GlobalInclude.GlobalImageBox
              source={GlobalInclude.GlobalAssets.FedX}
              style={{height: scale(50), width: scale(100)}}
            />
            <GlobalInclude.GlobalTextBox text={'2-3 days'} />
          </View>
          <View
            style={{
              marginHorizontal: scale(10),
              flex: 1,
              backgroundColor: GlobalInclude.GlobalColor.ColorWhite,
              width: '100%',
              height: scale(80),
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: scale(7),
            }}>
            <GlobalInclude.GlobalImageBox
              source={GlobalInclude.GlobalAssets.FedX}
              style={{height: scale(50), width: scale(100)}}
            />
            <GlobalInclude.GlobalTextBox text={'2-3 days'} />
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <GlobalInclude.GlobalTextBox
            text={'Order'}
            style={{
              textAlign: 'left',
              fontSize: scale(15),
              color: GlobalInclude.GlobalColor.LightGray,
            }}
            viewstyle={{
              flex: 1,
              marginHorizontal: scale(20),
              marginTop: scale(50),
            }}
          />

          <GlobalInclude.GlobalTextBox
            text={navigation.state.params.TotalPrice + '$'}
            style={{
              textAlign: 'right',
              fontSize: scale(15),
              color: GlobalInclude.GlobalColor.ColorBlack,
            }}
            viewstyle={{
              flex: 1,
              marginHorizontal: scale(20),
              marginTop: scale(50),
            }}
          />
        </View>
        {/* <View style={{flexDirection: 'row'}}>
          <GlobalInclude.GlobalTextBox
            text={'Delivery'}
            style={{
              textAlign: 'left',
              fontSize: scale(15),
              color: GlobalInclude.GlobalColor.LightGray,
            }}
            viewstyle={{
              flex: 1,
              marginHorizontal: scale(20),
              marginTop: scale(10),
            }}
          />

          <GlobalInclude.GlobalTextBox
            text={'15$'}
            style={{
              textAlign: 'right',
              fontSize: scale(15),
              color: GlobalInclude.GlobalColor.ColorBlack,
            }}
            viewstyle={{
              flex: 1,
              marginHorizontal: scale(20),
              marginTop: scale(10),
            }}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <GlobalInclude.GlobalTextBox
            text={'Summary'}
            style={{
              textAlign: 'left',
              fontSize: scale(15),
              color: GlobalInclude.GlobalColor.LightGray,
            }}
            viewstyle={{
              flex: 1,
              marginHorizontal: scale(20),
              marginTop: scale(10),
            }}
          />

          <GlobalInclude.GlobalTextBox
            text={'127$'}
            style={{
              textAlign: 'right',
              fontSize: scale(15),
              color: GlobalInclude.GlobalColor.ColorBlack,
            }}
            viewstyle={{
              flex: 1,
              marginHorizontal: scale(20),
              marginTop: scale(10),
            }}
          />
        </View> */}

        <TouchableOpacity onPress={() => checkout()}>
          <GlobalInclude.GlobalTextBox
            text={'SUBMIT ORDER'}
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

export default Login;
