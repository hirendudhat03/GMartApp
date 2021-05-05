import {View} from 'native-base';
import React from 'react';
import {TextInput, Image} from 'react-native';
import {scale} from '../Theme/Scalling';
import GlobalInclude from '../Global/GlobalInclude/globalinclude';
import FloatLabelTextInput from 'react-native-floating-label-text-input';

const flotinginputbox = (props) => {
  return (
    <View
      style={[
        {
          height: scale(55),
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
        },
        props.viewstyle,
      ]}>
      <View
        style={[
          {
            marginHorizontal: scale(20),
            backgroundColor: GlobalInclude.GlobalColor.ColorBlack,
            height: '100%',
          },
          props.innerviewstyle,
        ]}>
        <FloatLabelTextInput
          placeholder={props.placeholder}
          noBorder={false}
          placeholderTextColor={props.placeholderTextColor}
          selectionColor={GlobalInclude.GlobalColor.ColorBlack}
          onChangeTextValue={props.onChangeText}
          multiline={props.multiline}
          keyboardType={props.keyboardType}
          secureTextEntry={props.secureTextEntry}
          autoCapitalize={props.autoCapitalize}
          value={props.value}
        />
      </View>
      <View style={[{}, props.viewstylerightmain]}>
        <View style={[{}, props.viewstyleright]}>
          <Image source={props.iconright} style={[{}, props.iconstyleright]} />
        </View>
      </View>
    </View>
  );
};

export default flotinginputbox;
