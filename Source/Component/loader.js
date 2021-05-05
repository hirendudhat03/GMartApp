import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  ProgressBarAndroid,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {View} from 'native-base';
export default class animated_loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_loading: 0,
    };
    this.show_loader = this.show_loader.bind(this);
  }
  componentDidMount() {
    // ADD ORIENTATION LISTENER
  }
  componentWillUnmount() {
    // REMOVE ORIENTATION LISTENER
  }
  show_loader(is_loader) {
    this.setState({is_loading: is_loader});
  }

  render() {
    if (this.state.is_loading == 0) {
      return <View></View>;
    }
    return (
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.0)',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* BEGIN METHOD FOR DISPLAY LOADER VIEW */}

        <ActivityIndicator size="large" color="#ea1818" />

        {/* END METHOD FOR DISPLAY LOADER VIEW */}
      </View>
    );
  }
}
