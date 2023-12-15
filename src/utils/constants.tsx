import {Dimensions, PixelRatio} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wdp,
  heightPercentageToDP as hdp,
} from 'react-native-responsive-screen';

export const width = Dimensions.get('screen').width;
export const height = Dimensions.get('screen').height;

const customWidth = 1133;
const customHeight = 744;
export const ASPECT_RATIO = width / height;

export const widthPercentageToDP = (widthPercent: number | string) => {
  // Parse string percentage input and convert it to number.
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
};

export const heightPercentageToDP = (heightPercent: number | string) => {
  // Parse string percentage input and convert it to number.
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((height * elemHeight) / 100);
};

export const hp = (val: number) => {
  // get scaled height equivalent of design height
  // const num = val / 8.44;
  // return heightPercentageToDP(num);
  const dimension = (val / customHeight) * 100;
  return hdp(`${dimension}%`);
};

export const wp = (val: number) => {
  // get scaled width equivalent of design width
  // const num = val / 3.88;
  // return widthPercentageToDP(num);
  const dimension = (val / customWidth) * 100;
  return wdp(`${dimension}%`);
};

export const fontSz = (val: number) => RFPercentage(val / 8.5);

export const formatAsCurrency = (value: number) =>
  parseFloat(String(value))
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
