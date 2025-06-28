'use strict';

import { Dimensions, PixelRatio } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Guideline sizes
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size: number) =>
  (screenWidth / guidelineBaseWidth) * size;
const verticalScale = (size: number) =>
  (screenHeight / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

const getFontScaleValue = (maxScale = 1.5) => {
  const fontScale = PixelRatio.getFontScale();
  return fontScale > maxScale ? maxScale : fontScale;
};

export {
  getFontScaleValue,
  horizontalScale,
  moderateScale,
  screenHeight,
  screenWidth,
  verticalScale,
};
