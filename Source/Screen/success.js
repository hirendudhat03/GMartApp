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

const Login = ({navigation}) => {
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
            text={'Success'}
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

      
        <View style={{justifyContent:'center',height:'70%'}}>
          <GlobalInclude.GlobalImageBox
            source={GlobalInclude.GlobalAssets.Success}
            viewstyle={{width: '100%', alignItems: 'center'}}
          />
          <GlobalInclude.GlobalTextBox
            text={'Success!'}
            style={{fontSize: scale(22), marginTop: scale(20)}}
          />
          <GlobalInclude.GlobalTextBox
            text={'Your order will be delivered soon.'}
            style={{fontSize: scale(15), marginTop: scale(20)}}
          />
          <GlobalInclude.GlobalTextBox
            text={'Thank you for choosing our app!'}
            style={{fontSize: scale(15), marginTop: scale(3)}}
          />
        </View>
     
    </View>
  );
};

export default Login;
