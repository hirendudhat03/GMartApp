import {View} from 'native-base';
import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {scale} from '../Theme/Scalling';

const imagebox = (props) => {
  return (
    <View style={[{}, props.viewstyle]}>
        {
          props.uri == true ?
          (
            <Image source={{uri: props.source}} style={[{}, props.style]}></Image>
          ) : (
            <Image source={props.source} style={[{}, props.style]}></Image>
          )
        }
      
    </View>
  );
};

export default imagebox;
