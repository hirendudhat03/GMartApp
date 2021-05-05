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

//defalt function
const home = ({navigation}) => {
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
  const [Message, setMessage] = useState('');
  const [MessagePH, setMessagePH] = useState('Message');
  const [MessagePHColor, setMessagePHColor] = useState(
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
    } else if (Message === '') {
      setMessagePH('Enter Message');
      setMessagePHColor(GlobalInclude.GlobalColor.ColorRed);
      helpers.ToastShow(MessagePH, 'fail');
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

    let url = 'api/contact_us';

    let signupObj = {
      name: Name,
      email: Email,
      mobile_number: Mobile_Number,
      subject: 'subject',
      message: Message,
      id_language: global.languageid,
    };

    helpers.UrlReq(url, 'POST', signupObj).then((response) => {
      if (response != null) {
        if (response.status) {
          helpers.ToastShow(response.message, 'success');

          setName('');
          setEmail('');
          setMobile_Number('');
          setMessage('');

          global.global_loader_reff.show_loader(0);
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
        backgroundColor="transparent"
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
            text={'Contact Us'}
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
        <GlobalInclude.GlobalTextBox
          text={'Contact information'}
          style={{
            marginHorizontal: scale(20),
            textAlign: 'left',
            marginTop: scale(20),
            fontSize: scale(17),
          }}
        />

        <View
          style={{
            height: scale(110),
            marginHorizontal: scale(20),
            marginTop: scale(20),
            borderRadius: scale(7),
            backgroundColor: GlobalInclude.GlobalColor.ColorWhite,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}>
          <View
            style={{flex: 1, justifyContent: 'center', marginTop: scale(10)}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <GlobalInclude.GlobalImageBox
                source={GlobalInclude.GlobalAssets.Call}
                viewstyle={{marginLeft: scale(15)}}
              />
              <GlobalInclude.GlobalTextBox
                text={global.mobile_number}
                style={{fontSize: scale(14)}}
                viewstyle={{marginLeft: scale(15)}}
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              marginBottom: scale(10),
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <GlobalInclude.GlobalImageBox
                source={GlobalInclude.GlobalAssets.Email}
                viewstyle={{marginLeft: scale(15)}}
              />
              <GlobalInclude.GlobalTextBox
                text={global.email}
                style={{fontSize: scale(14)}}
                viewstyle={{marginLeft: scale(15)}}
              />
            </View>
          </View>
        </View>

        {/* <GlobalInclude.GlobalTextBox
          text={'Billing Address'}
          style={{
            marginHorizontal: scale(20),
            textAlign: 'left',
            marginTop: scale(20),
            fontSize: scale(17),
          }}
        /> */}

        <GlobalInclude.FlotingTextInput
          placeholder={NamePH}
          value={Name}
          onChangeText={(value) => setName(value)}
          placeholderTextColor={NamePHColor}
          autoCapitalize={'words'}
        />
        <GlobalInclude.FlotingTextInput
          placeholder={EmailPH}
          onChangeText={(value) => setEmail(value)}
          placeholderTextColor={EmailPHColor}
          autoCapitalize={'none'}
          value={Email}
        />
        <GlobalInclude.FlotingTextInput
          placeholder={Mobile_NumberPH}
          onChangeText={(value) => setMobile_Number(value)}
          placeholderTextColor={Mobile_NumberPHColor}
          keyboardType={'numeric'}
          value={Mobile_Number}
        />
        <GlobalInclude.FlotingTextInput
          placeholder={'Message'}
          viewstyle={{height: scale(80)}}
          onChangeText={(value) => setMessage(value)}
          placeholderTextColor={MessagePHColor}
          multiline={true}
          value={Message}
        />

        <TouchableOpacity onPress={() => SignupValidation()}>
          <GlobalInclude.GlobalTextBox
            text={'SEND'}
            style={{
              fontSize: scale(17),
              color: GlobalInclude.GlobalColor.ColorWhite,
            }}
            viewstyle={{
              marginTop: scale(20),
              height: scale(45),
              marginHorizontal: scale(100),
              backgroundColor: GlobalInclude.GlobalColor.ColorRed,
              borderRadius: scale(30),
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: scale(20),
            }}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default home;
