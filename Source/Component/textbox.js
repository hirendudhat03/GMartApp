import { View } from 'native-base';
import React from 'react';
import {Text} from 'react-native';
import { scale } from '../Theme/Scalling';

const textbox = (props) => {

    return(
        <View style={[{},props.viewstyle]}>
            <Text style={[{textAlign:'center'}, props.style]} numberOfLines={props.numberOfLines}>
                {props.text}
            </Text>
        </View>
    );
}

export default textbox;