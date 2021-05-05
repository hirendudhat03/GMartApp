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
];

const home = ({navigation}) => {
  const [ListItems] = useState(dummyArray);
  const [Alert_Visibility, setAlert_Visibility] = useState(false);
  const [Alert_Visibility1, setAlert_Visibility1] = useState(false);
  const [Data, setData] = useState();
  const [ChangeId, setChangeId] = useState();

  const [Billing_Address, setBilling_Address] = useState('');
  const [Billing_AddressPH, setBilling_AddressPH] = useState('Address line 1');
  const [Billing_AddressPHColor, setBilling_AddressPHColor] = useState(
    GlobalInclude.GlobalColor.LightGray,
  );
  const [Billing_Address_Other, setBilling_Address_Other] = useState('');
  const [Billing_Address_OtherPH, setBilling_Address_OtherPH] = useState(
    'Address line 2',
  );
  const [
    Billing_Address_OtherPHColor,
    setBilling_Address_OtherPHColor,
  ] = useState(GlobalInclude.GlobalColor.LightGray);
  const [State, setState] = useState('');
  const [StatePH, setStatePH] = useState('State');
  const [StatePHColor, setStatePHColor] = useState(
    GlobalInclude.GlobalColor.LightGray,
  );
  const [City, setCity] = useState('');
  const [CityPH, setCityPH] = useState('City');
  const [CityPHColor, setCityPHColor] = useState(
    GlobalInclude.GlobalColor.LightGray,
  );

  const deleteadderess = (id) => {
    global.global_loader_reff.show_loader(1);

    let url = 'api/address/delete';

    let signupObj = {
      id: id,
      id_user: global.userid,
      id_language: global.languageid,
    };

    helpers.UrlReq(url, 'POST', signupObj).then((response) => {
      if (response != null) {
        if (response.status) {
          helpers.ToastShow(response.message, 'success');
          global.global_loader_reff.show_loader(0);
          getaddress();
        } else {
          helpers.ToastShow(response.message, 'fail');
          global.global_loader_reff.show_loader(0);
          console.log('message =======> ', response.status);
        }
      } else {
        helpers.ToastShow(response.message, 'fail');
        global.global_loader_reff.show_loader(0);
      }
    });
  };

  const addaddress = () => {
    if (Billing_Address === '') {
      setBilling_AddressPH('Enter Address Line 1');
      setBilling_AddressPHColor(GlobalInclude.GlobalColor.ColorRed);
      helpers.ToastShow(Billing_AddressPH, 'fail');
    } else if (Billing_Address_Other === '') {
      setBilling_Address_OtherPH('Enter Address Line 2');
      setBilling_Address_OtherPHColor(GlobalInclude.GlobalColor.ColorRed);
      helpers.ToastShow(Billing_Address_OtherPH, 'fail');
    } else if (City === '') {
      setCityPH('Enter City');
      setCityPHColor(GlobalInclude.GlobalColor.ColorRed);
      helpers.ToastShow(CityPH, 'fail');
    } else if (State === '') {
      setStatePH('Enter State');
      setStatePHColor(GlobalInclude.GlobalColor.ColorRed);
      helpers.ToastShow(StatePH, 'fail');
    } else {
      global.global_loader_reff.show_loader(1);

      let url = 'api/address/add';

      let signupObj = {
        id_user: global.userid,
        id_language: global.languageid,
        billing_address: Billing_Address,
        shipping_address: Billing_Address_Other,
        state: State,
        city: City,
      };

      helpers.UrlReq(url, 'POST', signupObj).then((response) => {
        if (response != null) {
          if (response.status) {
            helpers.ToastShow(response.message, 'success');
            global.global_loader_reff.show_loader(0);
            Filter(false);
            getaddress();
          } else {
            helpers.ToastShow(response.message, 'fail');
            global.global_loader_reff.show_loader(0);
            console.log('message =======> ', response.status);
          }
        } else {
          helpers.ToastShow(response.message, 'fail');
          global.global_loader_reff.show_loader(0);
        }
      });
    }
  };

  const getaddress = () => {
    global.global_loader_reff.show_loader(1);

    let url = 'api/address/get';

    let signupObj = {
      id_user: global.userid,
      id_language: global.languageid,
    };

    helpers.UrlReq(url, 'POST', signupObj).then((response) => {
      if (response != null) {
        if (response.status) {
          setData(response.data);

          global.global_loader_reff.show_loader(0);
        } else {
          if (global.userid == null) {
            helpers.ToastShow('Login Your Device', 'fail');
          } else {
            if (global.userid == null) {
              helpers.ToastShow('Login Your Device', 'fail');
            } else {
              helpers.ToastShow(response.message, 'fail');
            }
          }
          global.global_loader_reff.show_loader(0);
          console.log('message =======> ', response.status);
        }
      } else {
        helpers.ToastShow(response.message, 'fail');
        global.global_loader_reff.show_loader(0);
      }
    });
  };

  const changeaddress = () => {
    if (Billing_Address === '') {
      setBilling_AddressPH('Enter Address Line 1');
      setBilling_AddressPHColor(GlobalInclude.GlobalColor.ColorRed);
      helpers.ToastShow(Billing_AddressPH, 'fail');
    } else if (Billing_Address_Other === '') {
      setBilling_Address_OtherPH('Enter Address Line 2');
      setBilling_Address_OtherPHColor(GlobalInclude.GlobalColor.ColorRed);
      helpers.ToastShow(Billing_Address_OtherPH, 'fail');
    } else if (City === '') {
      setCityPH('Enter City');
      setCityPHColor(GlobalInclude.GlobalColor.ColorRed);
      helpers.ToastShow(CityPH, 'fail');
    } else if (State === '') {
      setStatePH('Enter State');
      setStatePHColor(GlobalInclude.GlobalColor.ColorRed);
      helpers.ToastShow(StatePH, 'fail');
    } else {
      global.global_loader_reff.show_loader(1);

      let url = 'api/address/update';

      let signupObj = {
        id: ChangeId,
        id_user: global.userid,
        id_language: global.languageid,
        billing_address: Billing_Address,
        shipping_address: Billing_Address_Other,
        state: State,
        city: City,
      };

      helpers.UrlReq(url, 'POST', signupObj).then((response) => {
        if (response.data != null) {
          if (response.status) {
            helpers.ToastShow(response.message, 'success');
            global.global_loader_reff.show_loader(0);
            Filter1(false);
            getaddress();
          } else {
            helpers.ToastShow(response.message, 'fail');
            global.global_loader_reff.show_loader(0);
            console.log('message =======> ', response.status);
          }
        } else {
          helpers.ToastShow(response.message, 'fail');
          global.global_loader_reff.show_loader(0);
        }
      });
    }
  };

  useEffect(() => {
    getaddress();
  }, []);

  const Filter = (visible) => {
    setAlert_Visibility(visible);
  };
  const Filter1 = (visible, id) => {
    setAlert_Visibility1(visible);
    setChangeId(id);
  };

  const AllCategory = ({item, index}) => {
    return (
      <View>
        <View
          style={{
            height: scale(110),
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
            <TouchableOpacity onPress={() => Filter1(true, item.id)}>
              <GlobalInclude.GlobalTextBox
                text={'Change'}
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

          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 3}}>
              <GlobalInclude.GlobalTextBox
                text={item.billing_address + ','}
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
                text={item.shipping_address + ','}
                style={{
                  textAlign: 'left',
                  fontSize: scale(14),
                }}
                viewstyle={{
                  marginHorizontal: scale(20),
                }}
              />
              <GlobalInclude.GlobalTextBox
                text={item.city + ',' + item.state + ','}
                style={{
                  textAlign: 'left',
                  fontSize: scale(14),
                }}
                viewstyle={{
                  marginHorizontal: scale(20),
                }}
              />
            </View>

            <View style={{flex: 1}}>
              <TouchableOpacity onPress={() => deleteadderess(item.id)}>
                <GlobalInclude.GlobalImageBox
                  source={GlobalInclude.GlobalAssets.Delete}
                  style={{height: scale(30), width: scale(30)}}
                  viewstyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const AllCategory1 = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.replace('CheckOut', {
              line1: item.billing_address,
              line2: item.shipping_address,
              state: item.state,
              city: item.city,
            })
          }>
          <View
            style={{
              height: scale(110),
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
              <TouchableOpacity onPress={() => Filter1(true, item.id)}>
                <GlobalInclude.GlobalTextBox
                  text={'Change'}
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

            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 3}}>
                <GlobalInclude.GlobalTextBox
                  text={item.billing_address + ','}
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
                  text={item.shipping_address + ','}
                  style={{
                    textAlign: 'left',
                    fontSize: scale(14),
                  }}
                  viewstyle={{
                    marginHorizontal: scale(20),
                  }}
                />
                <GlobalInclude.GlobalTextBox
                  text={item.state + ',' + item.city + ','}
                  style={{
                    textAlign: 'left',
                    fontSize: scale(14),
                  }}
                  viewstyle={{
                    marginHorizontal: scale(20),
                  }}
                />
              </View>

              <View style={{flex: 1}}>
                <TouchableOpacity onPress={() => deleteadderess(item.id)}>
                  <GlobalInclude.GlobalImageBox
                    source={GlobalInclude.GlobalAssets.Delete}
                    style={{height: scale(30), width: scale(30)}}
                    viewstyle={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
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
            text={'Address'}
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

      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View>
          <GlobalInclude.GlobalTextBox
            text={'Personal Information'}
            style={{textAlign: 'left', fontSize: scale(15)}}
            viewstyle={{marginHorizontal: scale(20), marginTop: scale(20)}}
          />
          <View style={{marginTop: scale(10)}}>
            <FlatList
              data={Data}
              renderItem={
                navigation.state.params.status == 1 ? AllCategory1 : AllCategory
              }
              contentContainerStyle={{paddingBottom: scale(15)}}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <TouchableOpacity onPress={() => Filter()}>
            <View style={{alignItems: 'flex-end'}}>
              <GlobalInclude.GlobalImageBox
                source={GlobalInclude.GlobalAssets.Plus}
                style={{height: scale(15), width: scale(15)}}
                viewstyle={{
                  height: scale(50),
                  width: scale(50),
                  borderRadius: scale(50),
                  backgroundColor: GlobalInclude.GlobalColor.ColorRed,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: scale(20),
                  marginHorizontal: scale(20),
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Model */}

      <Modal
        visible={Alert_Visibility}
        transparent={true}
        animationType={'slide'}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <TouchableOpacity onPress={() => Filter(false)}>
            <View style={{height: '100%'}}></View>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: GlobalInclude.GlobalColor.ColorWhite,
              height: '55%',
              borderTopLeftRadius: scale(40),
              borderTopRightRadius: scale(40),
              width: '100%',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,
              elevation: 10,
            }}>
            <ScrollView
              style={{marginTop: scale(20)}}
              keyboardShouldPersistTaps={'handled'}>
              <GlobalInclude.GlobalTextBox
                text={'Add new Address'}
                style={{fontSize: scale(15)}}
              />

              <GlobalInclude.FlotingTextInput
                placeholder={Billing_AddressPH}
                onChangeText={(value) => setBilling_Address(value)}
                placeholderTextColor={Billing_AddressPHColor}
                value={Billing_Address}
              />
              <GlobalInclude.FlotingTextInput
                placeholder={Billing_Address_OtherPH}
                onChangeText={(value) => setBilling_Address_Other(value)}
                placeholderTextColor={Billing_Address_OtherPHColor}
                value={Billing_Address_Other}
              />

              <View style={{flex: 1}}>
                <GlobalInclude.FlotingTextInput
                  placeholder={CityPH}
                  onChangeText={(value) => setCity(value)}
                  placeholderTextColor={CityPHColor}
                  value={City}
                />
              </View>
              <View style={{flex: 1}}>
                <GlobalInclude.FlotingTextInput
                  placeholder={StatePH}
                  onChangeText={(value) => setState(value)}
                  placeholderTextColor={StatePHColor}
                  value={State}
                />
              </View>
              <TouchableOpacity onPress={() => addaddress()}>
                <GlobalInclude.GlobalTextBox
                  text={'ADD ADDRESS'}
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
                    marginTop: scale(20),
                    marginBottom: scale(20),
                  }}
                />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
      <Modal
        visible={Alert_Visibility1}
        transparent={true}
        animationType={'slide'}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <TouchableOpacity onPress={() => Filter1(false)}>
            <View style={{height: '100%'}}></View>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: GlobalInclude.GlobalColor.ColorWhite,
              height: '55%',
              borderTopLeftRadius: scale(40),
              borderTopRightRadius: scale(40),
              width: '100%',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,
              elevation: 10,
            }}>
            <ScrollView
              style={{marginTop: scale(20)}}
              keyboardShouldPersistTaps={'handled'}>
              <GlobalInclude.GlobalTextBox
                text={'Change Address'}
                style={{fontSize: scale(15)}}
              />

              <GlobalInclude.FlotingTextInput
                placeholder={Billing_AddressPH}
                onChangeText={(value) => setBilling_Address(value)}
                placeholderTextColor={Billing_AddressPHColor}
              />
              <GlobalInclude.FlotingTextInput
                placeholder={Billing_Address_OtherPH}
                onChangeText={(value) => setBilling_Address_Other(value)}
                placeholderTextColor={Billing_Address_OtherPHColor}
              />

              <View style={{flex: 1}}>
                <GlobalInclude.FlotingTextInput
                  placeholder={CityPH}
                  onChangeText={(value) => setCity(value)}
                  placeholderTextColor={CityPHColor}
                />
              </View>
              <View style={{flex: 1}}>
                <GlobalInclude.FlotingTextInput
                  placeholder={StatePH}
                  onChangeText={(value) => setState(value)}
                  placeholderTextColor={StatePHColor}
                />
              </View>

              <TouchableOpacity onPress={() => changeaddress()}>
                <GlobalInclude.GlobalTextBox
                  text={'CHANGE ADDRESS'}
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
                    marginTop: scale(20),
                    marginBottom: scale(20),
                  }}
                />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default home;
