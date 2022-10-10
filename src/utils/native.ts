import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-root-toast';
// import {Vibration} from 'react-native';
// import {Player} from '@react-native-community/audio-toolkit';

// 异步存储数据
export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    console.error((e as any).message);
  }
};

// 读取数据
export const getData = async (key: string, isJson: boolean = true) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return isJson ? JSON.parse(value) : value;
    }
  } catch (e) {
    // error reading value
    console.error((e as any).message);
  }
};

// 移除数据
export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
    console.log('remove error');
  }
};

export const getRandomInteger = (
  start: number,
  end: number,
  current?: number,
): number => {
  const gap = end - start;
  const index = Math.floor(start + gap * Math.random());
  if (current !== undefined) {
    console.log(`当前是${current}, 随机得到${index}`);
    return current === index ? getRandomInteger(start, end) : index;
  } else {
    return index;
  }
};

// 震动
// export const shake = (pattern = 0) => {
//   const {settings} = store.getState();
//   if (settings.shake) {
//     console.log('start to vibrate..');
//     Vibration.vibrate(pattern);
//   }
// };

// 播放音乐
// export const sing = (() => {
//   // app内有哪些场景，需要在此定义
//   let player = {
//     click: null,
//     avoid: null,
//   };
//   return function (type: keyof typeof player = 'click') {
//     const {settings} = store.getState();
//     if (settings.audio) {
//       console.log('start to sing...');
//       // 允许播放音乐
//       if (!player[type]) {
//         const fileName = `${type}.mp3`;
//         // 初始化
//         player[type] = new Player(fileName, {
//           autoDestroy: false,
//         }).play();
//       } else {
//         player[type].play();
//       }
//     }
//   };
// })();

export const copyToClipboard = (value: string) => {
  Clipboard.setString(value);
};

export const fetchCopiedText = async () => {
  const text = await Clipboard.getString();
  return text;
};

export const showToast = (value: string) => {
  Toast.show(value, {
    position: Toast.positions.CENTER,
    duration: 500,
    shadow: false,
  });
};

export {Toast};
