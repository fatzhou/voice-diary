/*
 * 主要解决字体大小不兼容的问题
 */

/*
 设备的像素密度，例如：
 PixelRatio.get() === 1          mdpi Android 设备 (160 dpi)
 PixelRatio.get() === 1.5        hdpi Android 设备 (240 dpi)
 PixelRatio.get() === 2          iPhone 4, 4S,iPhone 5, 5c, 5s,iPhone 6,xhdpi Android 设备 (320 dpi)
 PixelRatio.get() === 3          iPhone 6 plus , xxhdpi Android 设备 (480 dpi)
 PixelRatio.get() === 3.5        Nexus 6       */

import {Dimensions, PixelRatio} from 'react-native';

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window'); //设备的宽度

const fontScale = PixelRatio.getFontScale(); //返回字体大小缩放比例
// const pixelRatio = PixelRatio.get(); //当前设备的像素密度

//px转换成dp
const w2 = 750;
const h2 = 1334;
const scale = Math.min(deviceHeight / h2, deviceWidth / w2); //获取缩放比例
/**
 * 设置text为sp
 * @param size sp
 * return number dp
 */
export function setSpText(size: number) {
  return PixelRatio.roundToNearestPixel(size * scale * fontScale);
}

export function scaleSize(size: number) {
  const mySize = Math.round(size * scale + 0.5);
  return mySize;
}
