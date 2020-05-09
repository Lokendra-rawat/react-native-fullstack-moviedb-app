import DeviceInfo from 'react-native-device-info';
import NetInfo from '@react-native-community/netinfo';
import {Platform, StatusBar, Alert} from 'react-native';
import {NGROK_URL} from '../config';

const GENERIC_ERRORR = 'Something went wrong';
const JSON_HEADER = 'application/json';
const API_BASE = NGROK_URL;

const makeRequest = async (url, options) => {
  options = options || {};
  if (!options.full_url) {
    url = `${API_BASE}${url}`;
  }
  options.headers = options.headers || {};
  const [battery, net_info] = await Promise.all([
    DeviceInfo.getBatteryLevel(),
    NetInfo.fetch(),
  ]);
  options.headers.platform = Platform.OS === 'ios' ? 'ios' : 'android';
  options.headers.ver = '' + DeviceInfo.getBuildNumber();
  options.headers['os-version'] = '' + DeviceInfo.getSystemVersion();
  options.headers.battery = '' + battery;
  options.headers.brand = DeviceInfo.getBrand();
  options.headers.model = DeviceInfo.getDeviceId();
  options.headers.carrier = await DeviceInfo.getCarrier();
  options.headers['Content-Type'] =
    options.headers['Content-Type'] || JSON_HEADER;
  const opts = {
    headers: options.headers,
    method: options.method || 'GET',
  };

  if (options.body) {
    opts.body = options.body;
  }

  if (Platform.OS === 'ios') {
    StatusBar.setNetworkActivityIndicatorVisible(true);
  }
  try {
    if (!net_info.isConnected && !options.disable_netinfo) {
      Alert.alert(
        'Error',
        'Not connected to the internet',
        [
          {
            text: 'OK',
          },
        ],
        {
          cancelable: false,
        },
      );
      throw new Error('not connected to internet');
    }
    const response = await fetch(url, opts);
    if (response.status === 401) {
      throw new Error('logout');
    } else if (response.status === 426) {
      throw new Error('upgrade');
    }
    if (Platform.OS === 'ios') {
      StatusBar.setNetworkActivityIndicatorVisible(false);
    }
    return response;
  } catch (e) {
    if (Platform.OS === 'ios') {
      StatusBar.setNetworkActivityIndicatorVisible(false);
    }
    throw e;
  }
};

////////// movies apis //////////

async function getPopularMovies() {
  const response = await makeRequest('/movies/popular');
  if (response.status === 200) {
    return await response.json();
  } else {
    throw new Error(GENERIC_ERRORR);
  }
}

async function getUpcomingMovies() {
  const response = await makeRequest('/movies/upcoming');
  if (response.status === 200) {
    return await response.json();
  } else {
    throw new Error(GENERIC_ERRORR);
  }
}

async function getMovieDetails(movieId) {
  const response = await makeRequest(`/movies/details?itemId=${movieId}`);
  if (response.status === 200) {
    return await response.json();
  } else {
    throw new Error(GENERIC_ERRORR);
  }
}

export {getPopularMovies, getUpcomingMovies, getMovieDetails};
