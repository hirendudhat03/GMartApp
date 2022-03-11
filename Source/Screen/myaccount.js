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
  PermissionsAndroid,
  Modal,
} from 'react-native';
import GlobalInclude from '../Global/GlobalInclude/globalinclude';
import {scale} from '../Theme/Scalling';
import helpers from '../Global/Helper/helper';
//import ImagePicker from 'react-native-image-picker';
import {ImagePicker} from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';

const options = {
  mediaType: 'photo',
  maxWidth: 512,
  maxHeight: 512,
  quality: 1,
  includeBase64: false,
  saveToPhotos: true,
};

//defalt function
const home = ({navigation}) => {
  const [Image, setImage] = useState('');
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Mobile_Number, setMobile_Number] = useState('');

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

  const [filterVisible, setFilterVisible] = useState(false);
  const [imageresponse, setImageResponse] = useState();

  const openFilter = (visible) => {
    // alert('openFilter');
    setFilterVisible(visible);
  };

  const SignupValidation = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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
      SaveProfileApiCall();
    }
  };

  const SaveProfileApiCall = () => {
    global.global_loader_reff.show_loader(1);
    const body = [];
    let profileobj = {
      id_user: global.userid,
      id_language: global.languageid,
      name: Name,
      email: Email,
      mobile_number: Mobile_Number,
      loyalty_card_number: '123',
      billing_address: Billing_Address,
      billing_address_other: Billing_Address_Other,
      state: State,
      city: City,
    };

    let update_api_url = global.api_url + 'api/user/profile_edit';
    const registerString = JSON.stringify(profileobj);
    let imageDetail = null;

    if (imageresponse !== null) {
      imageDetail = JSON.parse(JSON.stringify(imageresponse));
    }

    body.push({name: 'data', data: registerString});
    
    if (imageDetail !== null) {
      var path = imageDetail.uri;
      let imageName = '';
      if (
        imageDetail.fileName === undefined ||
        imageDetail.fileName == null ||
        imageDetail.fileName === ''
      ) {
        var getFilename = path.split('/');
        imageName = getFilename[getFilename.length - 1];
        var extension = imageName.split('.')[1];
        imageName = new Date().getTime() + '.' + extension;
      } else {
        imageName = imageDetail.fileName;
      }

      let imagePath =
        Platform.OS === 'ios' ? path.replace('file://', '') : path;

      let imageType = imageDetail.type;

      var imageData = {
        name: 'image',
        filename: imageName,
        type: imageType,
        data: RNFetchBlob.wrap(decodeURIComponent(imagePath)),
      };
      body.push(imageData);
    }

    RNFetchBlob.fetch(
      'POST',
      update_api_url,
      {
        'Content-Type': 'multipart/form-data',
        apikey: 'fc7f4987b25ec004773f331e2e3fbf49',
      },
      body,
    ).then((resp) => {
      let bodyData = JSON.parse(resp.data);
      let response = bodyData;
      console.log('resposnee', response);
      if (response.status) {
        AsyncStorage.setItem('response.data.id', response.data.id);
        AsyncStorage.setItem('response.data.name', response.data.name);
        AsyncStorage.setItem('response.data.email', response.data.email);
        AsyncStorage.setItem(
          'response.data.mobile_number',
          response.data.mobile_number,
        );
        AsyncStorage.setItem(
          'response.data.loyalty_card_number',
          response.data.loyalty_card_number,
        );
        AsyncStorage.setItem(
          'response.data.billing_address',
          response.data.billing_address,
        );
        AsyncStorage.setItem('response.data.state', response.data.state);
        AsyncStorage.setItem('response.data.city', response.data.city);
        AsyncStorage.setItem('response.data.image', response.data.image);

        global.userid = response.data.id;
        global.name = response.data.name;
        global.email = response.data.email;
        global.mobile_number = response.data.mobile_number;
        global.loyalty_card_number = response.data.loyalty_card_number;
        global.billing_address = response.data.billing_address;
        global.state = response.data.state;
        global.city = response.data.city;
        global.image = response.data.image;

        helpers.ToastShow(response.message, 'success');
        global.global_loader_reff.show_loader(0);
      } else {
        helpers.ToastShow(response.message, 'fail');
        global.global_loader_reff.show_loader(0);
      }
    });
  };

  const opengallery = () => {
    setFilterVisible(false);

    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]).then((result) => {
        if (
          result['android.permission.READ_EXTERNAL_STORAGE'] &&
          result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
        ) {
          launchImageLibrary(options, (response) => {
            console.log(response);
            setImageResponse(response);
            setImage(response.uri);
          });
        } else if (
          result['android.permission.READ_EXTERNAL_STORAGE'] ||
          result['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            'never_ask_again'
        ) {
          // this.refs.toast.show(
          //   'Please Go into Settings -> Applications -> APP_NAME -> Permissions and Allow permissions to continue',
          // );
        }
      });
    }
  };
  const openCamera = () => {
    setFilterVisible(false);

    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]).then((result) => {
        if (result['android.permission.CAMERA'] === 'granted') {
          launchCamera(options, (response) => {
            console.log(response);
            setImageResponse(response);
            setImage(response.uri);
          });
        } else if (result['android.permission.CAMERA'] === 'never_ask_again') {
          // this.refs.toast.show(
          //   'Please Go into Settings -> Applications -> APP_NAME -> Permissions and Allow permissions to continue',
          // );
        }
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      {/* Header */}

      {/* <StatusBar
        backgroundColor={GlobalInclude.GlobalColor.ColorRed}
        barStyle="light-content"
        translucent
      /> */}

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
            text={'My Account'}
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
            height: scale(220),
            marginHorizontal: scale(20),
            marginTop: scale(50),
            backgroundColor: GlobalInclude.GlobalColor.ColorWhite,
          }}>
          <View style={{alignItems: 'center'}}>
            <GlobalInclude.GlobalImageBox
              uri={true}
              source={Image}
              style={{
                height: scale(80),
                width: scale(80),
                borderRadius: scale(50),
              }}
              viewstyle={{
                height: scale(80),
                width: scale(80),
                borderRadius: scale(50),
                borderWidth: scale(2),
                alignItems: 'center',
                marginTop: scale(-40),
                justifyContent: 'center',
                borderColor: GlobalInclude.GlobalColor.Gray,
                backgroundColor: GlobalInclude.GlobalColor.ColorWhite,
              }}
            />
          </View>
          <TouchableOpacity onPress={() => openFilter()}>
            <GlobalInclude.GlobalImageBox
              source={GlobalInclude.GlobalAssets.Edit}
              style={{
                height: scale(30),
                width: scale(30),
                borderRadius: scale(50),
              }}
              viewstyle={{
                height: scale(55),
                width: '100%',
                borderRadius: scale(50),
                alignItems: 'center',
                marginTop: scale(-35),
                marginLeft: scale(25),
                justifyContent: 'center',
              }}
            />
          </TouchableOpacity>

          <GlobalInclude.GlobalInputBox
            icon={GlobalInclude.GlobalAssets.Name}
            placeholder={'Enter Name'}
            // value={global.name}
            onChangeText={(value) => setName(value)}
            style={{fontSize: scale(14), marginLeft: scale(10)}}
            autoCapitalize={'words'}
            iconstyle={{
              height: scale(15),
              width: scale(15),
              marginLeft: scale(20),
            }}
            viewstyle={{
              flexDirection: 'row',
              height: scale(35),
              alignItems: 'center',
              marginTop: scale(5),
            }}
          />
          <View
            style={{
              height: scale(1),
              backgroundColor: GlobalInclude.GlobalColor.Gray,
              marginHorizontal: scale(48),
            }}
          />
          <GlobalInclude.GlobalInputBox
            icon={GlobalInclude.GlobalAssets.Email}
            placeholder={'Enter Email'}
            // value={global.email}
            onChangeText={(value) => setEmail(value)}
            style={{fontSize: scale(14), marginLeft: scale(10)}}
            autoCapitalize={'none'}
            iconstyle={{
              height: scale(15),
              width: scale(15),
              marginLeft: scale(20),
            }}
            viewstyle={{
              flexDirection: 'row',
              height: scale(35),
              alignItems: 'center',
              marginTop: scale(10),
            }}
          />
          <View
            style={{
              height: scale(1),
              backgroundColor: GlobalInclude.GlobalColor.Gray,
              marginHorizontal: scale(48),
            }}
          />
          <GlobalInclude.GlobalInputBox
            icon={GlobalInclude.GlobalAssets.Call}
            placeholder={'Enter Number'}
            // value={global.mobile_number}
            onChangeText={(value) => setMobile_Number(value)}
            style={{fontSize: scale(14), marginLeft: scale(10)}}
            keyboardType={'numeric'}
            iconstyle={{
              height: scale(15),
              width: scale(15),
              marginLeft: scale(20),
            }}
            viewstyle={{
              flexDirection: 'row',
              height: scale(35),
              alignItems: 'center',
              marginTop: scale(10),
            }}
          />
          <View
            style={{
              height: scale(1),
              backgroundColor: GlobalInclude.GlobalColor.Gray,
              marginHorizontal: scale(48),
            }}
          />
        </View>

        <GlobalInclude.GlobalTextBox
          text={'Delivery Address'}
          style={{
            marginHorizontal: scale(20),
            textAlign: 'left',
            marginTop: scale(20),
            fontSize: scale(17),
          }}
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

        <View style={{flexDirection: 'row'}}>
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
        </View>

        <TouchableOpacity onPress={() => SignupValidation()}>
          <GlobalInclude.GlobalTextBox
            text={'Update Profile'}
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
              marginHorizontal: scale(20),
              marginTop: scale(15),
            }}
          />
        </TouchableOpacity>
      </ScrollView>
      {/* Model */}
      <Modal visible={filterVisible} transparent={true} animationType={'fade'}>
        <View style={styles.modelMainView}>
          <View style={styles.modelInnerView}>
            <View
              style={{
                height: scale(40),
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 2.2,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  marginTop: scale(5),
                }}>
                <GlobalInclude.GlobalTextBox
                  text={'Upload Image'}
                  style={{fontSize: scale(20), fontWeight: 'bold'}}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => openFilter(false)}
                  style={{
                    height: scale(25),
                    width: scale(20),
                    marginRight: scale(20),
                    marginTop: scale(5),
                  }}>
                  <GlobalInclude.GlobalImageBox
                    source={GlobalInclude.GlobalAssets.Cancel}
                    style={{
                      height: scale(20),
                      width: scale(20),
                      marginRight: scale(20),
                      marginTop: scale(5),
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity onPress={() => opengallery()}>
              <View style={styles.modelItem}>
                <GlobalInclude.GlobalTextBox
                  text={'Gallery'}
                  style={{fontSize: scale(15)}}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openCamera()}>
              <View style={styles.modelItem}>
                <GlobalInclude.GlobalTextBox
                  text={'Camera'}
                  style={{fontSize: scale(15)}}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modelMainView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modelInnerView: {
    height: scale(200),
    marginHorizontal: '8%',
    width: '84%',
    backgroundColor: GlobalInclude.GlobalColor.ColorWhite,
    borderRadius: scale(20),
  },
  modelItem: {
    height: scale(50),
    marginTop: scale(15),
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(10),
    borderWidth: scale(1),
    marginHorizontal: '5%',
    borderColor: GlobalInclude.GlobalColor.Gray,
  },
});

export default home;
