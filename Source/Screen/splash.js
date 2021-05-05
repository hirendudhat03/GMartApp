//import React
import React, {useState, useEffect} from 'react';
import {View, ImageBackground, StatusBar} from 'react-native';
import GlobalInclude from '../Global/GlobalInclude/globalinclude';

//import component
import {Root} from 'native-base';
import {RootNavigators} from '../Global/Route/route';
import AsyncStorage from '@react-native-community/async-storage';
import helpers from '../Global/Helper/helper';
import DeviceInfo from 'react-native-device-info';

const splash = ({navigation}) => {
  const [IsLogin, setIsLogin] = useState(false);
  const [Check_LoginScreen, setCheck_LoginScreen] = useState(false);

  global.api_url = 'http://developerwork.in/gmart/';

  global.currencyid = 1;

  AsyncStorage.getItem('response.data.languageid').then(
    (value) =>
      value == null ? (global.languageid = '1') : (global.languageid = value),
    console.log('global.languageid ==>', global.languageid),
  );
  AsyncStorage.getItem('response.data.id').then(
    (value) => (global.userid = value),
  );
  AsyncStorage.getItem('response.data.name').then(
    (value) => (global.name = value),
  );
  AsyncStorage.getItem('response.data.email').then(
    (value) => (global.email = value),
  );
  AsyncStorage.getItem('response.data.mobile_number').then(
    (value) => (global.mobile_number = value),
  );
  AsyncStorage.getItem('response.data.loyalty_card_number').then(
    (value) => (global.loyalty_card_number = value),
  );
  AsyncStorage.getItem('response.data.billing_address').then(
    (value) => (global.billing_address = value),
  );
  AsyncStorage.getItem('response.data.state').then(
    (value) => (global.state = value),
  );
  AsyncStorage.getItem('response.data.city').then(
    (value) => (global.city = value),
  );
  AsyncStorage.getItem('response.data.image').then(
    (value) => (global.image = value),
  );

  useEffect(() => {
    if (global.bagnum == undefined) {
      global.bagnum = 0;
      //alert('true');
    } else {
      //alert('false');
    }

    let deviceId = DeviceInfo.getUniqueId();
    global.deviceid = deviceId;

    console.log('deviceId =>', global.deviceid);

    CheckLoginScreen();

    checkKeyword();
  });

  const checkKeyword = () => {
    console.log('checkKeyword');
    let url = 'api/app_keywords';

    if (global.languageid === undefined) {
      global.languageid = '1';
    } else {
    }

    var requestObj = {
      id_language: global.languageid,
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

          setIsLogin(true);
          global.global_loader_reff.show_loader(0);
        } else {
          global.global_loader_reff.show_loader(0);
        }
      } else {
        global.global_loader_reff.show_loader(0);
      }
    });
  };

  const CheckLoginScreen = () => {
    AsyncStorage.getItem('Check_LoginScreen1').then((value) => {
      if (value == null) {
        setCheck_LoginScreen(false);
      } else {
        setCheck_LoginScreen(value);
      }
    });
  };

  if (IsLogin == false) {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent
        />
        <ImageBackground
          source={GlobalInclude.GlobalAssets.SplashBg}
          style={{height: '100%'}}></ImageBackground>
      </View>
    );
  } else {
    const Navigation = RootNavigators('Login');
    const Navigation1 = RootNavigators('Tab');
    const Navigation2 = RootNavigators('TabWithoutLogin');

    // return (
    //   <Root>
    //     {global.userid == null ? (
    //       Check_LoginScreen == false ? (
    //         <Navigation />
    //       ) : (
    //         <Navigation2 />
    //       )
    //     ) : Check_LoginScreen == false ? (
    //       <Navigation />
    //     ) : (
    //       <Navigation1 />
    //     )}
    //     {/* {Check_LoginScreen == false ? <Navigation /> : <Navigation2 />} */}

    //     <GlobalInclude.Loader
    //       ref={(ref) => (global.global_loader_reff = ref)}
    //     />
    //     <GlobalInclude.Alert_Toast ref={(ref) => (global.toast_reff = ref)} />
    //   </Root>
    // );

    if (global.userid == null) {
      return (
        <Root>
          {Check_LoginScreen == false ? <Navigation /> : <Navigation2 />}

          <GlobalInclude.Loader
            ref={(ref) => (global.global_loader_reff = ref)}
          />
          <GlobalInclude.Alert_Toast ref={(ref) => (global.toast_reff = ref)} />
        </Root>
      );
    } else {
      return (
        <Root>
          {Check_LoginScreen == false ? <Navigation /> : <Navigation1 />}

          <GlobalInclude.Loader
            ref={(ref) => (global.global_loader_reff = ref)}
          />
          <GlobalInclude.Alert_Toast ref={(ref) => (global.toast_reff = ref)} />
        </Root>
      );
    }
  }
};

export default splash;
