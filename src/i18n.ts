import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import cn from './assets/i18n/cn';
import en from './assets/i18n/en';
import tc from './assets/i18n/tc';
import {Languages} from './core/const';
// import store from '~/store';
// import {update} from '~/reducers/settings';

const locales = RNLocalize.getLocales();
const systemLanguage: string = locales[0]?.languageTag; // 用户系统偏好语言
console.log('获得系统语言；', systemLanguage);
if (systemLanguage) {
  // @ts-ignore
  I18n.locale =
    {
      'zh-Hans-US': Languages.CN,
      'en-US': Languages.EN,
      'zh-Hant-US': Languages.TC,
      'zh-Hans-CN': Languages.CN,
      'zh-Hant-CN': Languages.TC,
    }[systemLanguage] || Languages.CN;
} else {
  // @ts-ignore
  I18n.locale = Languages.CN; // 默认语言为中文
}

// 更新store
// store.dispatch(
//   update({
//     language: I18n.locale,
//   }),
// );

// store.subscribe(() => {
//   const {
//     settings: {language},
//   } = store.getState();

//   if (language && language !== I18n.locale) {
//     I18n.locale = language;
//   }
// });

I18n.fallbacks = true;
I18n.translations = {
  cn,
  en,
  tc,
};

export default I18n;
export const t = (key: string) => I18n.t(key);
