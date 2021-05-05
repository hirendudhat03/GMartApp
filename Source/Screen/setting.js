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
  const [Alert_Visibility, setAlert_Visibility] = useState(false);
  const [toggleSwitch, settoggleSwitch] = useState(false);

  const [oldPassword, setoldPassword] = useState('');
  const [oldPasswordPH, setoldPasswordPH] = useState('Old Password');
  const [oldPasswordPHColor, setoldPasswordPHColor] = useState(
    GlobalInclude.GlobalColor.LightGray,
  );
  const [Password, setPassword] = useState('');
  const [PasswordPH, setPasswordPH] = useState('New Password');
  const [PasswordPHColor, setPasswordPHColor] = useState(
    GlobalInclude.GlobalColor.LightGray,
  );
  const [CPassword, setCPassword] = useState('');
  const [CPasswordPH, setCPasswordPH] = useState('Repeat Password');
  const [CPasswordPHColor, setCPasswordPHColor] = useState(
    GlobalInclude.GlobalColor.LightGray,
  );

  const toggleSwitchfun = () => {
    if (toggleSwitch) {
      settoggleSwitch(false);
    } else {
      settoggleSwitch(true);
    }
  };

  const changepassword = () => {
    if (oldPassword === '') {
      setoldPasswordPH('Enter Old Password');
      setoldPasswordPHColor(GlobalInclude.GlobalColor.ColorRed);
      helpers.ToastShow(PasswordPH, 'fail');
    } else if (Password === '') {
      setPasswordPH('Enter New Password');
      setPasswordPHColor(GlobalInclude.GlobalColor.ColorRed);
      helpers.ToastShow(PasswordPH, 'fail');
    } else if (CPassword === '') {
      setCPasswordPH('Enter Repeat Password');
      setCPasswordPHColor(GlobalInclude.GlobalColor.ColorRed);
      helpers.ToastShow(CPasswordPH, 'fail');
    } else if (Password != CPassword) {
      helpers.ToastShow('Password Not Match', 'fail');
    } else {
      global.global_loader_reff.show_loader(1);

      let url = 'api/user/change_password';

      var requestObj = {
        id_language: global.languageid,
        id_user: global.userid,
        old_password: oldPassword,
        new_password: Password,
      };

      helpers.UrlReq(url, 'POST', requestObj).then((response) => {
        if (response != null) {
          if (response.status) {
            helpers.ToastShow(response.message, 'success');
            global.global_loader_reff.show_loader(0);
          } else {
            if (global.userid == null) {
              helpers.ToastShow('Login Your Device', 'fail');
            } else {
              helpers.ToastShow(response.message, 'fail');
            }
            global.global_loader_reff.show_loader(0);
          }
        } else {
          helpers.ToastShow(response.message, 'fail');
          global.global_loader_reff.show_loader(0);
        }
      });
    }
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
            text={'Setting'}
            style={{
              fontSize: scale(20),
              color: GlobalInclude.GlobalColor.ColorWhite,
              textAlign: 'center',
            }}
            viewstyle={{justifyContent: 'center', height: scale(40)}}
          />
          <View style={{flex: 1}}></View>
        </View>
      </View>

      {/* Design */}
      <ScrollView>
        <GlobalInclude.GlobalTextBox
          text={'Password Change'}
          style={{fontSize: scale(15), textAlign: 'left'}}
          viewstyle={{marginTop: scale(20), marginHorizontal: scale(20)}}
        />

        <GlobalInclude.FlotingTextInput
          placeholder={oldPasswordPH}
          onChangeText={(value) => setoldPassword(value)}
          placeholderTextColor={oldPasswordPHColor}
          value={oldPassword}
          autoCapitalize={'none'}
          secureTextEntry={true}
        />

        <View
          style={{
            alignItems: 'flex-end',
            marginHorizontal: scale(20),
            marginTop: scale(10),
          }}></View>
        <GlobalInclude.FlotingTextInput
          placeholder={PasswordPH}
          onChangeText={(value) => setPassword(value)}
          placeholderTextColor={PasswordPHColor}
          value={Password}
          autoCapitalize={'none'}
          secureTextEntry={true}
        />

        <GlobalInclude.FlotingTextInput
          placeholder={CPasswordPH}
          onChangeText={(value) => setCPassword(value)}
          placeholderTextColor={CPasswordPHColor}
          value={CPassword}
          autoCapitalize={'none'}
          secureTextEntry={true}
        />

        <TouchableOpacity onPress={() => changepassword()}>
          <GlobalInclude.GlobalTextBox
            text={'SAVE PASSWORD'}
            style={{
              fontSize: scale(15),
              color: GlobalInclude.GlobalColor.ColorWhite,
            }}
            viewstyle={{
              backgroundColor: GlobalInclude.GlobalColor.ColorRed,
              marginHorizontal: scale(80),
              height: scale(45),
              borderRadius: scale(30),
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: scale(30),
            }}
          />
        </TouchableOpacity>

        <View style={{flexDirection: 'row', marginTop: scale(20)}}>
          <GlobalInclude.GlobalTextBox
            text={'Notification'}
            style={{textAlign: 'left', fontSize: scale(15)}}
            viewstyle={{
              flex: 1,
              marginHorizontal: scale(20),
              marginTop: scale(20),
            }}
          />
          <View style={{flex: 1, marginTop: scale(10), marginRight: scale(20)}}>
            <Switch
              onValueChange={() => toggleSwitchfun()}
              value={toggleSwitch}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
