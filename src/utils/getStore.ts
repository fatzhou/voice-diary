// useEffect(() => {
//   getDeviceName().then((name) => {
//     console.log('deviceName', name);
//     // dispatch(updateUserInfo('deviceName', name));
//   });
//   // 开始获取配置
// }, [dispatch]);

// import {getData} from '~/core/utils/native';
// import {useDispatch} from 'react-redux';
// import {getDeviceName} from 'react-native-device-info';
// import axios from 'axios';
// import * as VersionNumber from 'react-native-version-number';
// import md5 from 'blueimp-md5';
// import {setAdRates} from '~/core/utils/bridge';

// import axios from 'axios';

// export const getSha = async () => {
//   try {
//     console.log('start to verify sha...');
//     const {data} = await axios.get(
//       'https://app.711.icu/weihaozhushou.json?t=' + Date.now(),
//     );
//     const {sha} = data;
//     console.log(sha, 'sha');
//     const shaData: string = sha.find(
//       (item: [string, string]) => item[0] === VersionNumber.appVersion,
//     );
//     if (shaData) {
//       // 获取sha
//       const lowerCaseSha = shaData[1].toLowerCase();
//       const config = lowerCaseSha.slice(0, 3);
//       const configMd5 = md5(config).toLowerCase();
//       const adRate = lowerCaseSha.slice(8, 10);

//       if (configMd5.slice(10) === shaData[1].toLowerCase().slice(10)) {
//         console.log(config[0], config[1], config[2]);
//         setAdRates(adRate);
//         dispatch(
//           updateType({
//             addType: +config[1],
//             subscribeType: +config[2],
//             totalType: +config[0],
//           }),
//         );
//       }
//     }
//   } catch (e) {
//     console.log('error: ', e.message);
//   }
// };
