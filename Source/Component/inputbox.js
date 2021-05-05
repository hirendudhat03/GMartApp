import {View} from 'native-base';
import React from 'react';
import {TextInput, Image} from 'react-native';
import {scale} from '../Theme/Scalling';
import GlobalInclude from '../Global/GlobalInclude/globalinclude';

const inputbox = (props) => {
  return (
    <View style={[{}, props.viewstyle]}>
      <Image source={props.icon} style={[{}, props.iconstyle]} />
      <TextInput
        style={[{}, props.style]}
        placeholder={props.placeholder}
        selectionColor={props.selectionColor}
        value={props.value}
        onChangeText={props.onChangeText}
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
        autoCapitalize={props.autoCapitalize}
        // placeholderTextColor={
        //   this.props.placeholderTextColor
        //     ? this.props.placeholderTextColor
        //     : Color.ColorWhite
        // }
      />
      <View style={[{}, props.viewstylerightmain]}>
        <View style={[{}, props.viewstyleright]}>
          <Image source={props.iconright} style={[{}, props.iconstyleright]} />
        </View>
      </View>
    </View>
  );
};

export default inputbox;
