import React, {useEffect, useState} from 'react';
import {View, StatusBar, TouchableOpacity} from 'react-native';
import GlobalInclude from '../Global/GlobalInclude/globalinclude';
import {scale} from '../Theme/Scalling';
import helpers from '../Global/Helper/helper';

const Login = ({navigation}) => {
  const [Email, setEmail] = useState('');
  const [EmailPH, setEmailPH] = useState('Email');
  const [EmailPHColor, setEmailPHColor] = useState(
    GlobalInclude.GlobalColor.LightGray,
  );

  const ForgateValidation = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (Email === '') {
      setEmailPH('Enter Email');
      setEmailPHColor(GlobalInclude.GlobalColor.ColorRed);
      helpers.ToastShow(EmailPH, 'fail');
    } else if (reg.test(Email) == 0) {
      helpers.ToastShow('Email Formate Not Currect', 'fail');
    } else {
      Forgot();
    }
  };
  const Forgot = () => {
    global.global_loader_reff.show_loader(1);

    let url = 'api/user/forgot_password';

    let loginObj = {
      email: Email,
      id_language: '1',
    };

    helpers.UrlReq(url, 'POST', loginObj).then((response) => {
      if (response != null) {
        if (response.status) {
          helpers.ToastShow(response.message, 'success');
          global.global_loader_reff.show_loader(0);
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
          height: scale(100),
          backgroundColor: GlobalInclude.GlobalColor.ColorRed,
          justifyContent: 'flex-end',
        }}>
        <View style={{height: scale(100), marginLeft: scale(20)}}>
          <TouchableOpacity style={{flex:1,justifyContent: 'center',}} onPress={() => navigation.goBack()}>
            <GlobalInclude.GlobalImageBox
              source={GlobalInclude.GlobalAssets.LeftIcon2}
              style={{
                height: scale(20),
                width: scale(14),
              }}
              viewstyle={{
                marginTop:scale(25),
                height: scale(40),
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}
            />
          </TouchableOpacity>
          <GlobalInclude.GlobalTextBox
            text={'Forgot password'}
            style={{
              fontSize: scale(20),
              color: GlobalInclude.GlobalColor.ColorWhite,
              textAlign: 'left',
            }}
            viewstyle={{flex:1,justifyContent: 'center', height: scale(20)}}
          />
        </View>
      </View>

      {/* Design */}

      <GlobalInclude.GlobalTextBox
        text={
          'Please, enter your email address. you will receive a link to create a new password via email.'
        }
        style={{fontSize: scale(13), textAlign: 'left'}}
        viewstyle={{marginHorizontal: scale(20), marginTop: scale(80)}}
      />

      <GlobalInclude.FlotingTextInput
        placeholder={EmailPH}
        onChangeText={(value) => setEmail(value)}
        placeholderTextColor={EmailPHColor}
      />

      <TouchableOpacity onPress={() => ForgateValidation()}>
        <GlobalInclude.GlobalTextBox
          text={'SEND'}
          style={{
            fontSize: scale(17),
            color: GlobalInclude.GlobalColor.ColorWhite,
          }}
          viewstyle={{
            marginTop: scale(70),
            height: scale(50),
            marginHorizontal: scale(20),
            backgroundColor: GlobalInclude.GlobalColor.ColorRed,
            borderRadius: scale(30),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Login;
