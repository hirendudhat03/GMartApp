import {View} from 'native-base';
import React from 'react';
import {TextInput, Image, Text, TouchableOpacity} from 'react-native';
import {scale} from '../Theme/Scalling';
import GlobalInclude from '../Global/GlobalInclude/globalinclude';

const inputbox = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[{}, props.viewstyle]}>
        <View style={[{}, props.iconview]}>
          <Image source={props.icon} style={[{}, props.iconstyle]} />
        </View>
        <Text style={[{textAlign: 'center'}, props.style]}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default inputbox;
