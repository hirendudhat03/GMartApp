import React, {useEffect, useState} from 'react';
import {View, ScrollView, StatusBar, TouchableOpacity} from 'react-native';
import GlobalInclude from '../Global/GlobalInclude/globalinclude';
import {scale} from '../Theme/Scalling';
import helpers from '../Global/Helper/helper';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationActions, StackActions} from 'react-navigation';

const Login = ({navigation}) => {
  const [Email, setEmail] = useState('');
  const [EmailPH, setEmailPH] = useState('Email');
  const [EmailPHColor, setEmailPHColor] = useState(
    GlobalInclude.GlobalColor.LightGray,
  );
  const [Password, setPassword] = useState('');
  const [PasswordPH, setPasswordPH] = useState('Password');
  const [PasswordPHColor, setPasswordPHColor] = useState(
    GlobalInclude.GlobalColor.LightGray,
  );

  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'Tab'})],
  });

  const LoginValidation = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (Email === '') {
      setEmailPH('Enter Email');
      setEmailPHColor(GlobalInclude.GlobalColor.ColorRed);
      helpers.ToastShow(EmailPH, 'fail');
    } else if (Password === '') {
      setPasswordPH('Enter Password');
      setPasswordPHColor(GlobalInclude.GlobalColor.ColorRed);
      helpers.ToastShow(PasswordPH, 'fail');
    } else if (reg.test(Email) == 0) {
      helpers.ToastShow('Email Formate Not Currect', 'fail');
    } else {
      login();
    }
  };

  const login = () => {
    global.login = 1;
    global.global_loader_reff.show_loader(1);

    let url = 'api/user/login';

    let loginObj = {
      email: Email,
      password: Password,
      id_language: global.languageid,
      device_id: global.deviceid,
    };

    helpers.UrlReq(url, 'POST', loginObj).then((response) => {
      if (response.data != null) {
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

          // navigation.replace('Tab');
          navigation.dispatch(resetAction);
        } else {
          helpers.ToastShow(response.message, 'fail');
          global.global_loader_reff.show_loader(0);
        }
      } else {
        helpers.ToastShow(response.message, 'fail');
        global.global_loader_reff.show_loader(0);
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
          height: scale(60),
          backgroundColor: GlobalInclude.GlobalColor.ColorRed,
          justifyContent: 'center',
        }}>
        <GlobalInclude.GlobalTextBox
          text={'Login'}
          style={{
            fontSize: scale(20),
            color: GlobalInclude.GlobalColor.ColorWhite,
            textAlign: 'center',
            marginTop: scale(10),
          }}
          viewstyle={{justifyContent: 'center', height: scale(40)}}
        />
      </View>

      {/* Design */}
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <GlobalInclude.FlotingTextInput
          placeholder={EmailPH}
          value={Email}
          onChangeText={(value) => setEmail(value)}
          placeholderTextColor={EmailPHColor}
          autoCapitalize={'none'}
        />
        <GlobalInclude.FlotingTextInput
          placeholder={PasswordPH}
          value={Password}
          onChangeText={(value) => setPassword(value)}
          placeholderTextColor={PasswordPHColor}
          secureTextEntry={true}
        />

        <View
          style={{
            alignItems: 'flex-end',
            marginHorizontal: scale(20),
            marginTop: scale(10),
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgatPassword')}>
            <GlobalInclude.GlobalTextBox
              text={'Forgot Your password?'}
              style={{fontSize: scale(14)}}
              viewstyle={{height: scale(15)}}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => LoginValidation()}>
          <GlobalInclude.GlobalTextBox
            text={'LOGIN'}
            style={{
              fontSize: scale(17),
              color: GlobalInclude.GlobalColor.ColorWhite,
            }}
            viewstyle={{
              marginTop: scale(35),
              height: scale(50),
              marginHorizontal: scale(20),
              backgroundColor: GlobalInclude.GlobalColor.ColorRed,
              borderRadius: scale(30),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            marginHorizontal: scale(20),
            marginTop: scale(10),
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <GlobalInclude.GlobalTextBox
              text={"Don't have account? Register"}
              style={{fontSize: scale(14), textAlign: 'center'}}
              viewstyle={{height: scale(20), marginTop: scale(10)}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginHorizontal: scale(20),
            marginTop: scale(10),
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Tab')}>
            <GlobalInclude.GlobalTextBox
              text={'Skip'}
              style={{fontSize: scale(14), textAlign: 'center'}}
              viewstyle={{height: scale(20)}}
            />
          </TouchableOpacity>
        </View>

        <GlobalInclude.GlobalTextBox
          text={'Or login with'}
          viewstyle={{height: scale(20), marginTop: scale(10)}}
        />

        <View
          style={{
            flex: 1,
            height: scale(55),
            backgroundColor: GlobalInclude.GlobalColor.ColorWhite,
            marginHorizontal: scale(20),
            marginTop: scale(10),
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: scale(8),
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,

            elevation: 2,
          }}>
          <GlobalInclude.GlobalImageBox
            source={GlobalInclude.GlobalAssets.Google}
            viewstyle={{marginLeft: scale(20), borderRadius: scale(8)}}
          />
          <GlobalInclude.GlobalTextBox
            text={'Sign In With Google'}
            style={{fontSize: scale(17)}}
            viewstyle={{
              flex: 1,
              marginLeft: scale(-20),
              justifyContent: 'center',
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginHorizontal: scale(20),
            backgroundColor: '#2a598f',
            height: scale(55),
            marginTop: scale(20),
            marginBottom: scale(10),
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: scale(8),
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,

            elevation: 2,
          }}>
          <GlobalInclude.GlobalImageBox
            source={GlobalInclude.GlobalAssets.FaceBook}
            viewstyle={{
              marginLeft: scale(20),
              justifyContent: 'center',
              borderRadius: scale(8),
            }}
          />
          <GlobalInclude.GlobalTextBox
            text={'Sign In With Facebook'}
            style={{
              color: GlobalInclude.GlobalColor.ColorWhite,
              fontSize: scale(17),
            }}
            viewstyle={{flex: 1, marginLeft: scale(-20)}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
