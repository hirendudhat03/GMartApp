import React, {useEffect, useState} from 'react';
import {View, ScrollView, StatusBar, TouchableOpacity} from 'react-native';
import GlobalInclude from '../Global/GlobalInclude/globalinclude';
import {scale} from '../Theme/Scalling';
import helpers from '../Global/Helper/helper';

const Login = ({navigation}) => {
  const [Name, setName] = useState('');
  const [NamePH, setNamePH] = useState('Name');
  const [NamePHColor, setNamePHColor] = useState(
    GlobalInclude.GlobalColor.LightGray,
  );
  const [Email, setEmail] = useState('');
  const [EmailPH, setEmailPH] = useState('Email');
  const [EmailPHColor, setEmailPHColor] = useState(
    GlobalInclude.GlobalColor.LightGray,
  );
  const [Mobile_Number, setMobile_Number] = useState('');
  const [Mobile_NumberPH, setMobile_NumberPH] = useState('Mobile No.');
  const [Mobile_NumberPHColor, setMobile_NumberPHColor] = useState(
    GlobalInclude.GlobalColor.LightGray,
  );
  const [Password, setPassword] = useState('');
  const [PasswordPH, setPasswordPH] = useState('Password');
  const [PasswordPHColor, setPasswordPHColor] = useState(
    GlobalInclude.GlobalColor.LightGray,
  );
  const [CPassword, setCPassword] = useState('');
  const [CPasswordPH, setCPasswordPH] = useState('Confirm Password');
  const [CPasswordPHColor, setCPasswordPHColor] = useState(
    GlobalInclude.GlobalColor.LightGray,
  );
  const [Loyalty_Card_Number, setLoyalty_Card_Number] = useState('');
  const [Loyalty_Card_NumberPH, setLoyalty_Card_NumberPH] = useState(
    'Loyalty Card \nNumber',
  );
  const [Loyalty_Card_NumberPHColor, setLoyalty_Card_NumberPHColor] = useState(
    GlobalInclude.GlobalColor.LightGray,
  );
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

  const SignupValidation = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let number = /^(?=.*[0-9])$/;

    if (Name === '') {
      setNamePH('Enter Name');
      setNamePHColor(GlobalInclude.GlobalColor.ColorRed);
      helpers.ToastShow(NamePH, 'fail');
    } else if (Email === '') {
      setEmailPH('Enter Email');
      setEmailPHColor(GlobalInclude.GlobalColor.ColorRed);
      helpers.ToastShow(EmailPH, 'fail');
    } else if (Mobile_Number === '') {
      setMobile_NumberPH('Enter Mobile No.');
      setMobile_NumberPHColor(GlobalInclude.GlobalColor.ColorRed);
      helpers.ToastShow(Mobile_NumberPH, 'fail');
      // } else if (Loyalty_Card_Number === '') {
      //   setLoyalty_Card_NumberPH('Enter Loyalty Card No.');
      //   setLoyalty_Card_NumberPHColor(GlobalInclude.GlobalColor.ColorRed);
      //   helpers.ToastShow(Loyalty_Card_NumberPH, 'fail');
    } else if (Password === '') {
      setPasswordPH('Enter Password');
      setPasswordPHColor(GlobalInclude.GlobalColor.ColorRed);
      helpers.ToastShow(PasswordPH, 'fail');
    } else if (CPassword === '') {
      setCPasswordPH('Confirm Password');
      setCPasswordPHColor(GlobalInclude.GlobalColor.ColorRed);
      helpers.ToastShow(CPasswordPH, 'fail');
    } else if (Billing_Address === '') {
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
    } else if (Password != CPassword) {
      helpers.ToastShow('Password Not Match', 'fail');
    } else if (reg.test(Email) == 0) {
      helpers.ToastShow('Email Formate Not Currect', 'fail');
    } else if (Mobile_Number.length != 10) {
      helpers.ToastShow('Enter 10 Digit Mobile No.', 'fail');
    } else {
      SignUp();
    }
  };
  const SignUp = () => {
    global.global_loader_reff.show_loader(1);

    let url = 'api/user/registration';

    let signupObj = {
      name: Name,
      email: Email,
      mobile_number: Mobile_Number,
      password: Password,
      id_language: global.languageid,
      billing_address: Billing_Address,
      billing_address_other: Billing_Address_Other,
      state: State,
      city: City,
    };

    helpers.UrlReq(url, 'POST', signupObj).then((response) => {
      if (response != null) {
        if (response.status) {
          helpers.ToastShow(response.message, 'success');
          global.global_loader_reff.show_loader(0);
          navigation.navigate('Login');
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <GlobalInclude.GlobalImageBox
              source={GlobalInclude.GlobalAssets.LeftIcon2}
              style={{
                height: scale(20),
                width: scale(14),
                marginTop: scale(10),
              }}
              viewstyle={{
                height: scale(40),
                alignItems: 'flex-start',
                marginTop: scale(15),
                justifyContent: 'center',
              }}
            />
          </TouchableOpacity>

          <GlobalInclude.GlobalTextBox
            text={'Sign Up'}
            style={{
              fontSize: scale(20),
              color: GlobalInclude.GlobalColor.ColorWhite,
              textAlign: 'left',
            }}
            viewstyle={{justifyContent: 'center', height: scale(40)}}
          />
        </View>
      </View>

      {/* Design */}
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <GlobalInclude.FlotingTextInput
          placeholder={NamePH}
          onChangeText={(value) => setName(value)}
          placeholderTextColor={NamePHColor}
          autoCapitalize={'words'}
          value={Name}
        />
        <GlobalInclude.FlotingTextInput
          placeholder={EmailPH}
          onChangeText={(value) => setEmail(value)}
          placeholderTextColor={EmailPHColor}
          autoCapitalize={'none'}
          value={Email}
        />
        <View style={{flex: 1}}>
          <GlobalInclude.FlotingTextInput
            placeholder={Mobile_NumberPH}
            onChangeText={(value) => setMobile_Number(value)}
            placeholderTextColor={Mobile_NumberPHColor}
            keyboardType={'numeric'}
            value={Mobile_Number}
          />
        </View>

        {/* <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <GlobalInclude.FlotingTextInput
              placeholder={Mobile_NumberPH}
              onChangeText={(value) => setMobile_Number(value)}
              placeholderTextColor={Mobile_NumberPHColor}
            />
          </View>
          <View style={{flex: 1}}>
            <GlobalInclude.FlotingTextInput
              placeholder={Loyalty_Card_NumberPH}
              onChangeText={(value) => setLoyalty_Card_Number(value)}
              placeholderTextColor={Loyalty_Card_NumberPHColor}
            />
          </View>
        </View> */}
        <View style={{flex: 1}}>
          <GlobalInclude.FlotingTextInput
            placeholder={PasswordPH}
            onChangeText={(value) => setPassword(value)}
            placeholderTextColor={PasswordPHColor}
            secureTextEntry={true}
            autoCapitalize={'none'}
            value={Password}
          />
        </View>
        <View style={{flex: 1}}>
          <GlobalInclude.FlotingTextInput
            placeholder={CPasswordPH}
            onChangeText={(value) => setCPassword(value)}
            placeholderTextColor={CPasswordPHColor}
            secureTextEntry={true}
            autoCapitalize={'none'}
            value={CPassword}
          />
        </View>
        {/* <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <GlobalInclude.FlotingTextInput
              placeholder={PasswordPH}
              onChangeText={(value) => setPassword(value)}
              placeholderTextColor={PasswordPHColor}
            />
          </View>
          <View style={{flex: 1}}>
            <GlobalInclude.FlotingTextInput
              placeholder={CPasswordPH}
              onChangeText={(value) => setCPassword(value)}
              placeholderTextColor={CPasswordPHColor}
            />
          </View>
        </View> */}

        <GlobalInclude.GlobalTextBox
          text={'Billing Address'}
          style={{
            fontSize: scale(15),
            textAlign: 'left',
            color: GlobalInclude.GlobalColor.LightGray,
          }}
          viewstyle={{
            marginTop: scale(35),
            marginHorizontal: scale(20),
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
        {/* <View style={{flexDirection: 'row'}}>
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
        </View> */}

        <View
          style={{
            alignItems: 'flex-end',
            marginHorizontal: scale(20),
            marginTop: scale(10),
          }}>
          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <GlobalInclude.GlobalTextBox
                text={'Already have an account?'}
                style={{fontSize: scale(14)}}
              />
            </TouchableOpacity>
            <GlobalInclude.GlobalImageBox
              source={GlobalInclude.GlobalAssets.RedArrow}
              viewstyle={{marginLeft: scale(5)}}
            />
          </View> */}
        </View>
        <TouchableOpacity onPress={() => SignupValidation()}>
          <GlobalInclude.GlobalTextBox
            text={'SIGN UP'}
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
              marginBottom: scale(10),
            }}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Login;
