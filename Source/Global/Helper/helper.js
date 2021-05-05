const React = require('react-native');
const Component = require('react-native');
import {Alert, AsyncStorage, NetInfo, Platform} from 'react-native';
import {Toast} from 'native-base';
const helpers = {
  ToastShow: function (name, style) {
    if (style == 'success') {
      global.toast_reff.show_toast(name, '1');
    } else {
      global.toast_reff.show_toast(name, '0');
    }
  },

  UrlReq: async function (url, method, bodydata) {
    let responce = [];

    let headers = new Headers();
    headers.set('apikey', 'fc7f4987b25ec004773f331e2e3fbf49');

    const loginString = JSON.stringify(bodydata);

    // console.log('URL => ', url);
    // console.log('Method => ', method);
    // console.log('BODY_DATA => ', loginString);
    // console.log('baseurl =>', global.api_url + url);

    var formdata = new FormData();
    formdata.append('data', loginString);
    // console.log('formdata => ',formdata)

    try {
      const response = await fetch(global.api_url + url, {
        method: method,
        body: formdata,
        headers: headers,
      });
      let responseJson = await response.json();

      console.log('Url =>', global.api_url + url);
      console.log('BodyDataJson ==>', JSON.stringify(bodydata));
      console.log('BodyDataString ==>', loginString);
      console.log('responseJson => ', responseJson);

      responce.push(responseJson);
      return responce[0];
    } catch (err) {
      responce.push(err);
      console.log('error', err);
      return responce[0];
    }
  },
};
export default helpers;
