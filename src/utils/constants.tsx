import {Dimensions, PixelRatio, Platform} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wdp,
  heightPercentageToDP as hdp,
} from 'react-native-responsive-screen';

interface LocationData {
  speed: number;
  heading: number;
  longitude: number;
  accuracy: number;
  latitude: number;
  altitudeAccuracy: number;
  altitude: number;
}

export const {width, height} = Dimensions.get('window');

export const naira = '\u20A6';

const customWidth = 414;
const customHeight = 896;

export const ASPECT_RATIO = width / height;

export const scale = (size: number) => (width / customWidth) * size;

export const ms = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export const widthPercentageToDP = (widthPercent: number | string) => {
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);

  return PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
};

export const heightPercentageToDP = (heightPercent: number | string) => {
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);

  return PixelRatio.roundToNearestPixel((height * elemHeight) / 100);
};

export const hp = (val: number) => {
  const dimension = (val / customHeight) * 100;
  return hdp(`${dimension}%`);
};

export const wp = (val: number) => {
  const dimension = (val / customWidth) * 100;
  return wdp(`${dimension}%`);
};

export const isIphoneX = () => {
  const dimension = Dimensions.get('window');

  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (dimension.height === 812 ||
      dimension.width === 812 ||
      dimension.height === 896 ||
      dimension.width === 896)
  );
};

export const fontSz = (val: number) => RFPercentage(val / 8.5);

export const formatAmount = (value: any, toFixed = 2) => {
  return parseFloat(
    String(value)
      .replace(/(.*){1}/, '0$1')
      .replace(/[^\d]/g, '')
      .replace(/(\d\d?)$/, '.$1'),
  )
    .toFixed(toFixed)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatAsCurrency = (value: number) =>
  `${'$'}${parseFloat(String(value))
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

export const validateEmail = (email: any) => {
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return isValidEmail;
};
